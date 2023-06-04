import axios from "axios";
import { withTiming } from "./logging.js";

async function sendResult(resultUrl, document, securityToken) {
    await withTiming("Send result back", () =>
        axios({
            method: "POST",
            url: resultUrl,
            data: document,
            headers: {
                "Content-Type": "application/pdf",
                "X-Security-Token": securityToken,
            },
        })
    ).catch((error) => {
        throw new Error(`Failed to send result: ${error}`);
    });
}

export function createModuleConnector() {
    return {
        sendResult,
    };
}
