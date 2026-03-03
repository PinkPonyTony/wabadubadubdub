import fs from 'fs';
import * as cheerio from 'cheerio';

async function scrape() {
    console.log("Fetching index...");
    const res = await fetch('https://thedecisionlab.com/biases-index');
    const html = await res.text();
    const $ = cheerio.load(html);

    const biases = [];
    // The structure seems to be links inside specific divs or a lists.
    // We'll select all links that contain '/biases/'

    $('a[href*="/biases/"]').each((i, el) => {
        const link = $(el).attr('href');
        const fullLink = link.startsWith('http') ? link : `https://thedecisionlab.com${link}`;

        // Some links might be categories or pagination, let's filter out ones that don't look like bias pages
        if (fullLink.includes('thedecisionlab.com/biases/')) {
            // Find text or surrounding context. The layout we saw:
            // Div containing the Tag (e.g. Memory), Title (e.g. Action Bias), Query (Why do we...)
            // Often these are within a specific structure, let's just grab the text of the link
            const textStr = $(el).text().trim();
            if (textStr.length > 10) {
                biases.push({ fullLink, textStr });
            }
        }
    });

    // Deduplicate by link
    const uniqueBiasesMap = new Map();
    for (const b of biases) {
        if (!uniqueBiasesMap.has(b.fullLink)) {
            uniqueBiasesMap.set(b.fullLink, b);
        }
    }

    const uniqueBiases = Array.from(uniqueBiasesMap.values());
    console.log(`Found ${uniqueBiases.length} unique bias links.`);

    fs.writeFileSync('bias_links_test.json', JSON.stringify(uniqueBiases, null, 2));
}

scrape().catch(console.error);
