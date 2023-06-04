import { withTiming, logMessage, logLevel } from "./logging.js";

async function navigateToPage(page, pageUrl, securityToken, requestAnalyzer) {
    if (page === undefined) throw new Error("Browser not initialized");

    await page.setRequestInterception(true);
    let interceptRequests = true;

    page.on("request", (request) => {
        if (!interceptRequests || !request.isNavigationRequest())
            return request.continue();

        const headers = request.headers();
        headers["X-Security-Token"] = securityToken;
        interceptRequests = false;
        request.continue({ headers });
    });

    if (requestAnalyzer !== undefined) {
        page.on("response", (response) =>
            requestAnalyzer.analyzeResponse(response)
        );
    }

    await withTiming("Navigate to page", async () => page.goto(pageUrl)).catch(
        (error) => {
            throw new Error(`Failed to navigate to page: ${error}`);
        }
    );
}

async function waitForContent(page) {
    if (page === null) throw new Error("Browser not initialized");

    await withTiming("Wait for content to load", async () =>
        Promise.all([
            page.waitForNavigation({ waitUntil: "networkidle2" }),
            page.waitForSelector("#content .document-content", {
                visible: true,
            }),
        ])
    ).catch((error) => {
        throw new Error(`Failed to load page: ${error}`);
    });
}

async function pageOrientationIsLandscape(page) {
    if (page === null) throw new Error("Browser not initialized");

    return (
        (await withTiming("Determine page orientation", async () =>
            page.$(".page-orientation-landscape")
        )) !== null
    );
}

async function determinePageSize(page) {
    if (page === null) throw new Error("Browser not initialized");

    const allowedPageSizes = [
        "letter",
        "legal",
        "tabloid",
        "a0",
        "a1",
        "a2",
        "a3",
        "a4",
        "a5",
        "a6",
    ];

    let pageSize = await withTiming("Determine page size", async () =>
        page
            .$eval("[class*='page-size']", (node) =>
                Array.from(node.classList)
                    .find((c) => c.startsWith("page-size"))
                    .replace("page-size-", "")
            )
            .catch(() => "a4")
    );

    if (!allowedPageSizes.includes(pageSize)) {
        logMessage("Invalid page size, setting page size to A4", logLevel.warn);
        pageSize = "a4";
    }

    return pageSize;
}

async function pageNumbersEnabled(page) {
    if (page === null) throw new Error("Browser not initialized");

    return (
        (await withTiming("Determine page numbers enabled", async () =>
            page.$(".enable-page-numbers")
        )) !== null
    );
}

function getHeaderFooterOptions(enablePageNumbers) {
    const headerTemplate = "<div></div>";
    const footerTemplate =
        "<div style='width:50%'>&nbsp;</div><div style='padding-right: 5mm; width:50%; text-align:right; font-size:8px;'><span class='pageNumber'></span> / <span class='totalPages'></span></div>";

    return {
        headerTemplate: headerTemplate,
        footerTemplate: footerTemplate,
        displayHeaderFooter: enablePageNumbers,
        margin: {
            bottom: enablePageNumbers ? "10mm" : "0",
        },
    };
}

async function generateDocument(page, pageUrl, securityToken, requestAnalyzer) {
    await navigateToPage(page, pageUrl, securityToken, requestAnalyzer);
    await waitForContent(page);

    const isLandscape = await pageOrientationIsLandscape(page);
    const pageSize = await determinePageSize(page);
    const enablePageNumbers = await pageNumbersEnabled(page);
    const headerFooterOptions = getHeaderFooterOptions(enablePageNumbers);

    return withTiming("Export to PDF", async () =>
        page.pdf({
            preferCSSPageSize: true,
            printBackground: true,
            landscape: isLandscape,
            format: pageSize,
            ...headerFooterOptions,
        })
    ).catch((error) => {
        throw new Error(`Failed to export to PDF: ${error}`);
    });
}

async function getPageMetrics(page) {
    if (page === undefined) throw new Error("Browser not initialized");
    return page.metrics();
}

function getRequestStatistics(requestAnalyzer) {
    if (requestAnalyzer === undefined) return undefined;
    return requestAnalyzer.getStatistics();
}

export function createDocumentGenerator(browser, requestAnalyzer) {
    let page;

    return {
        initialize: async () => {
            page = await browser.openPage();
        },
        generateDocument: async (pageUrl, securityToken) =>
            withTiming("Generate document", async () =>
                generateDocument(page, pageUrl, securityToken, requestAnalyzer)
            ),
        getPageMetrics: async () => getPageMetrics(page),
        getRequestStatistics: () => getRequestStatistics(requestAnalyzer),
    };
}
