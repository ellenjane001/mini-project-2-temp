
let brandsImages = [
    [
        {
            name: 'amd',
            link: 'https://lh3.googleusercontent.com/V1G8Jm59O9nfP_bmGhgf6MROLJzzToacC7BEuCrEfRYXOpq_FsWWTsyV2yfknrMef7R9vH7168fI3uenNJC_9EVB9oTHBiHbliP420R0Tu8h-gA9QIXjIHbCBpbkCciCZx3pI07XRg=w2400'
        },
        {
            name: 'intel',
            link: 'https://logodownload.org/wp-content/uploads/2014/04/intel-logo-1-1.png'
        },
        {
            name: 'tuf',
            link: 'https://lh3.googleusercontent.com/pkQ9NxwGzRaThigIRkd_0phjt50YiVJcqNzC4rhlWw_BtL4dtJcTeURXyth0bINZrX8t58lXjW2h3oMbfQfznXz3OYPWMrlpJRvt65MLss0O_oXtTC5g8RWQ1yz-18GAE4Y5a9MPPw=w2400'
        }
    ],
    [
        {
            name: 'msi',
            link: 'https://lh3.googleusercontent.com/XbqxfUrBnHF2ca8aG-BAinQ4KLgRaY1hnbYC4cu9nswxqXxBsLUimFiMhhwa9FCoNL9UYq0bCGYgfvbAzdUdSuYd5Bwxcpg6kQQbky9Mw6kfd4YRCNuJHwVoSraAnAq9dMtmoIsP9A=w2400'
        },
        {
            name: 'nvidia',
            link: 'https://www.nvidia.com/content/dam/en-zz/Solutions/about-nvidia/logo-and-brand/01-nvidia-logo-vert-500x200-2c50-d.png'
        },
        {
            name: 'gigabyte',
            link: 'https://lh3.googleusercontent.com/EKxRyINVD13bU3oe146VOPWcj93t5RQf9uFZhV0VwW_wpE2YKfr43pa9Wic1oZGLjNum0OHuHsJ2U97AHWT0bHH19zM_Dl3Md9ppkn4XOhOLmzWiccBDvf_SJAiHj_RTvxx-7bRigQ=w2400'
        }
    ],
    [
        {
            name: 'rog',
            link: 'https://lh3.googleusercontent.com/VOEiIDPcbXnGArKc5bOH68yfRoeTsknUt_Ga5BO0hOeAq55WE1NWNBaba3WJ0gf6SD9_dLxpMEYikGcbmCgcAjIoj3IcDj8oesc4p3h7FA3hDuoey3V2v7rm1oecZwv6Dgz5U3wlLA=w2400'
        },
        {
            name: 'toshiba',
            link: 'https://lh3.googleusercontent.com/nzPxXokTw8IddVjQHfT0jIXeG10l11MQmhRnzHRuyZvvxj6ucwsc3PvnZndGhSu0PiHDQjRgzh4iZfKaVXNznRbq44UycomRd1SUfgYGTxQ2rCVH9zkDvg4evMTBz32oi9gjkCE5ag=w2400'
        },
        {
            name: 'razer',
            link: 'https://lh3.googleusercontent.com/OAVmLpnKYIxQ6wMEfbmdTZM_ksQ6Qx_r26bmsyS0Scq1eagpXbngatCqQpgialHXDN4eNm8npmNIcu3vBrHI85dVPoB4Ifi8JGRNd6X_ajHtxgHmArq4GBB__l8OMM61zlRMU2vJew=w2400'
        }
    ]
]
let count = 0
document.getElementById('left').onclick = (e) => {
    // console.log(count++)
    console.log(`url: ('${brandsImages[0][count++].link}')`)
    document.getElementById('img1').style.backgroundImage = `url:('${brandsImages[0][count++].link}')`
}
document.getElementById('right').onclick = (e) => {
    console.log(count--)
}