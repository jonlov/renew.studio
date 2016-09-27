module.exports = {
    companyName: 'Renew',

    defaultHead: {
        companyName: 'Renew',
        urlWebSite: 'http://Renew.Studio/',
        urlWebSiteNoHttp: 'Renew.Studio',
        route: '',
        logo: 'images/logo_78x72.png',
        title: 'Renew | The Official Renew Site',
        description: 'The Official Renew website. Web development and design, 3D animations, music editing and more...',
        keywords: 'music, renew, studio, video, artist, app, web, responsive, design, creative',
        image: 'images/facebook-flyer.jpg',
        googleProfile: 'http://plus.google.com/104040303061795717579',
        twitterProfile: 'http://www.twitter.com/',
        twitterAccount: '@e',
        twitterCard: 'summary_large_image',
        facebookProfile: 'http://www.facebook.com/e',
        og_type: 'website',
        status: 200
    },

    origin: 'https://renew.studio, https://api.sandbox.paypal.com, https://api-3t.sandbox.paypal.com, https://api-aa.sandbox.paypal.com, https://api-aa-3t.sandbox.paypal.com, https://svcs.sandbox.paypal.com, https://pointofsale.sandbox.paypal.com, https://ipnpb.sandbox.paypal.com, https://www.sandbox.paypal.com',

    TOKEN_SECRET: function (){
        return process.env.TOKEN_SECRET || 'localTestingToken-124321125';
    }
}