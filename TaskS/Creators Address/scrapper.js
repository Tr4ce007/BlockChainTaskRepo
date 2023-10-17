const puppeteer = require('puppeteer');

async function fetchContractCreatorAddress(address) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Visit the Etherscan address page for the provided address
        await page.goto(`https://etherscan.io/address/${address}`);
        console.log(`https://etherscan.io/address/${address}`);

        // Wait for the address details to load (you may need to adjust the selector)
        await page.waitForSelector('.d-flex');
        console.log(`Wait end`);

        // Extract the creator's address (assuming it's the first address displayed)
        const creatorAddress = await page.evaluate(() => {
            console.log("here");
            const addressElements = document.querySelectorAll('.d-flex a[href^="/address/"]');
            console.log(addressElements);
            if (addressElements.length > 0) {
                return addressElements[0].innerText;
            }
            return null;
        });

        // Close the browser
        await browser.close();

        if (creatorAddress) {
            console.log(`Creator Address for ${address}: ${creatorAddress}`);
        } else {
            console.log(`No creator address found for ${address}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Replace 'YOUR_ADDRESS' with the actual Ethereum address you want to investigate
const targetAddress = '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD';

fetchContractCreatorAddress(targetAddress);


/*
<div class="d-flex align-items-center gap-1">
<a href="/address/0x946e9c780f3c79d80e51e68d259d0d7e794f2124" data-bs-toggle="tooltip" data-bs-trigger="hover">0x946E9C...794F2124</a><a class="js-clipboard link-secondary " href="javascript:;" data-clipboard-text="0x946E9C780F3c79D80e51e68d259d0D7E794F2124" data-bs-toggle="tooltip" data-bs-trigger="hover" data-hs-clipboard-options="{ &quot;type&quot;: &quot;tooltip&quot;, &quot;successText&quot;: &quot;Copied!&quot;, &quot;classChangeTarget&quot;: &quot;#linkIcon_1&quot;, &quot;defaultClass&quot;: &quot;fa-copy&quot;, &quot;successClass&quot;: &quot;fa-check&quot; }" aria-label="Copy Address"><i id="linkIcon_1" class="far fa-copy fa-fw "></i> </a><span class="text-muted text-nowrap"> at txn </span><a class="hash-tag text-truncate" href="/tx/0x8262d7c12366abc7282b0bc5ad2e7376309eb72f07af6fa0ab1c82ad3d13555b" data-bs-toggle="tooltip" data-bs-trigger="hover">0x8262d7c12366abc7282b0bc5ad2e7376309eb72f07af6fa0ab1c82ad3d13555b</a>
</div>

*/