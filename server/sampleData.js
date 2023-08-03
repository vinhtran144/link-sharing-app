// mainly served as a sample as I test out GraphQL queries

const users = [
    {
        id: '1',
        name: 'Adam',
        linkIDs: ['2', '4'],
        devLinkURL: 'AWDBNKJS'
    },
    {
        id: '2',
        name: 'Sam',
        linkIDs: ['1', '5'],
        devLinkURL: 'IUINUINMJ'
    },
    {
        id: '3',
        name: 'Liz',
        linkIDs: ['3'],
        devLinkURL: 'WIOOJMJOI'
    },
    {
        id: '4',
        name: 'New User',
        linkIDs: [],
        devLinkURL: 'YUNUNGBUH'
    }
];

const links = [
    {
        id: '1',
        platform: 'Youtube',
        websiteURL: "youtube.com/channel/Sam"
    },
    {
        id: '2',
        platform: 'Youtube',
        websiteURL: "youtube.com/channel/Adam"
    },
    {
        id: '3',
        platform: 'GitHub',
        websiteURL: "github.com/Liz"
    },
    {
        id: '4',
        platform: 'GitHub',
        websiteURL: "github.com/Adam"
    },
    {
        id: '5',
        platform: 'Twitter',
        websiteURL: "Twitter.com/Sam"
    },
];

module.exports = {users, links};