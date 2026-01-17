/**
 * Hanogt Security Bot
 * Detects malicious code patterns and bans users who attempt to run harmful code
 */

import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc, collection, serverTimestamp } from "firebase/firestore";

// Malicious code patterns to detect
const MALICIOUS_PATTERNS = {
    // System command execution
    systemCommands: [
        /os\.system\s*\(/gi,
        /subprocess\.(call|run|Popen)\s*\(/gi,
        /exec\s*\(/gi,
        /eval\s*\(/gi,
        /shell_exec\s*\(/gi,
        /system\s*\(/gi,
        /passthru\s*\(/gi,
        /popen\s*\(/gi,
        /proc_open\s*\(/gi,
        /Runtime\.getRuntime\(\)\.exec/gi,
        /ProcessBuilder/gi,
    ],

    // File system attacks
    fileAttacks: [
        /rm\s+-rf\s+\//gi,
        /rm\s+-rf\s+\*/gi,
        /del\s+\/[fqs]\s+/gi,
        /rmdir\s+\/[sq]\s+/gi,
        /format\s+[a-z]:/gi,
        /shutil\.rmtree\s*\(/gi,
        /os\.remove\s*\(/gi,
        /os\.unlink\s*\(/gi,
        /fs\.unlinkSync\s*\(/gi,
        /fs\.rmdirSync\s*\(/gi,
        /File\.delete\s*\(/gi,
        /Files\.delete\s*\(/gi,
    ],

    // Fork bombs and infinite loops with resource consumption
    resourceAttacks: [
        /:\(\)\{\s*:\|:\s*&\s*\}/gi, // Bash fork bomb
        /while\s*\(\s*true\s*\)\s*\{\s*fork/gi,
        /for\s*\(\s*;\s*;\s*\)\s*fork/gi,
        /\bfork\s*\(\s*\)\s*.*\bfork\s*\(\s*\)/gi,
        /while\s*\(\s*1\s*\)\s*\{[^}]*malloc/gi,
        /while\s*True\s*:\s*.*\.append/gi,
    ],

    // Network attacks and unauthorized access
    networkAttacks: [
        /socket\.connect\s*\(\s*\(['"]\d+\.\d+\.\d+\.\d+['"]/gi,
        /urllib\.request\.urlopen\s*\(['"](http|ftp)/gi,
        /requests\.(get|post)\s*\(['"](http|ftp)/gi,
        /fetch\s*\(['"](http|ftp)/gi,
        /XMLHttpRequest/gi,
        /net\.connect\s*\(/gi,
        /new\s+Socket\s*\(/gi,
    ],

    // Data theft patterns
    dataTheft: [
        /keyboard\s*import/gi,
        /pynput/gi,
        /keylogger/gi,
        /pyautogui\.screenshot/gi,
        /ImageGrab\.grab/gi,
        /win32clipboard/gi,
        /pyperclip/gi,
        /ctypes\.windll/gi,
        /subprocess.*password/gi,
        /os\.environ\[/gi,
    ],

    // Crypto mining
    cryptoMining: [
        /coinhive/gi,
        /cryptonight/gi,
        /minero/gi,
        /stratum\+tcp/gi,
        /xmrig/gi,
        /crypto-?loot/gi,
    ],

    // Ransomware patterns
    ransomware: [
        /\.encrypt\s*\(/gi,
        /AES\.new\s*\(/gi,
        /Fernet\s*\(/gi,
        /bitcoin.*wallet/gi,
        /ransom/gi,
        /your files.*encrypted/gi,
    ],
};

export interface SecurityCheckResult {
    isMalicious: boolean;
    threats: string[];
    severity: "low" | "medium" | "high" | "critical";
    shouldBan: boolean;
}

/**
 * Check code for malicious patterns
 */
export function checkMaliciousCode(code: string): SecurityCheckResult {
    const threats: string[] = [];
    let severity: "low" | "medium" | "high" | "critical" = "low";

    // Check each category of patterns
    for (const [category, patterns] of Object.entries(MALICIOUS_PATTERNS)) {
        for (const pattern of patterns) {
            if (pattern.test(code)) {
                threats.push(category);

                // Set severity based on category
                if (category === "ransomware" || category === "cryptoMining") {
                    severity = "critical";
                } else if (category === "dataTheft" || category === "networkAttacks") {
                    if (severity !== "critical") severity = "high";
                } else if (category === "resourceAttacks" || category === "fileAttacks") {
                    if (severity === "low") severity = "medium";
                } else if (category === "systemCommands") {
                    if (severity === "low") severity = "medium";
                }

                break; // Found one pattern in this category, move to next
            }
        }
    }

    const uniqueThreats = [...new Set(threats)];
    const isMalicious = uniqueThreats.length > 0;
    const shouldBan = severity === "critical" || severity === "high" || uniqueThreats.length >= 2;

    return {
        isMalicious,
        threats: uniqueThreats,
        severity,
        shouldBan
    };
}

/**
 * Ban a user permanently
 */
export async function banUser(email: string, reason: string, maliciousCode: string): Promise<boolean> {
    try {
        const banRef = doc(db, "banned_users", email);
        await setDoc(banRef, {
            email,
            reason,
            maliciousCode: maliciousCode.substring(0, 1000), // Store first 1000 chars only
            bannedAt: serverTimestamp(),
            permanent: true
        });

        // Also update user document
        const userRef = doc(db, "users", email);
        await setDoc(userRef, { banned: true }, { merge: true });

        console.log(`[Hanogt Bot] User banned: ${email} - Reason: ${reason}`);
        return true;
    } catch (error) {
        console.error("[Hanogt Bot] Error banning user:", error);
        return false;
    }
}

/**
 * Check if a user is banned
 */
export async function isUserBanned(email: string): Promise<{ banned: boolean; reason?: string }> {
    try {
        const banRef = doc(db, "banned_users", email);
        const banDoc = await getDoc(banRef);

        if (banDoc.exists()) {
            return { banned: true, reason: banDoc.data().reason };
        }

        return { banned: false };
    } catch (error) {
        console.error("[Hanogt Bot] Error checking ban status:", error);
        return { banned: false };
    }
}

/**
 * Log security event
 */
export async function logSecurityEvent(
    email: string,
    eventType: "warning" | "block" | "ban",
    details: SecurityCheckResult,
    code: string
): Promise<void> {
    try {
        const eventRef = doc(collection(db, "security_logs"));
        await setDoc(eventRef, {
            email,
            eventType,
            threats: details.threats,
            severity: details.severity,
            codeSnippet: code.substring(0, 500),
            timestamp: serverTimestamp()
        });
    } catch (error) {
        console.error("[Hanogt Bot] Error logging security event:", error);
    }
}
