const axios = require('axios');
const { createObjectCsvWriter } = require('csv-writer');

const GITHUB_REPO = 'appwrite/appwrite'; 
const CSV_OUTPUT = 'open_pull_requests.csv';

const fetchOpenPullRequests = async () => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${GITHUB_REPO}/pulls`, {
            params: { state: 'open' },
        });

        const pullRequests = response.data.map(pr => ({
            title: pr.title,
            created_at: pr.created_at,
            user: pr.user.login,
        }));

        const csvWriter = createObjectCsvWriter({
            path: CSV_OUTPUT,
            header: [
                { id: 'title', title: 'PR Title' },
                { id: 'created_at', title: 'Created Date' },
                { id: 'user', title: 'Author' },
            ],
        });

        await csvWriter.writeRecords(pullRequests);
        console.log(`Successfully wrote ${pullRequests.length} PRs to ${CSV_OUTPUT}`);
    } catch (error) {
        console.error('Error fetching pull requests:', error.message);
    }
};

fetchOpenPullRequests();
