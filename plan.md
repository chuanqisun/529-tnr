# Setup
1. Build and deploy from Netlify: https://app.netlify.com/sites/529tnr/overview
2. Build hourly from IFTTT: https://ifttt.com/applets/95767564d-deploy-529-rider-packet-site-hourly
3. IFTTT uses webhook provided by Netlify to trigger build and deploy
4. Weather data from Dark Sky: https://darksky.net/dev/account
5. Ride emails collected from gmail with label "529tnr-bot" and stored in [a personal google drive folder](https://drive.google.com/drive/u/0/folders/1vEI6XEdd_8ryebe8ZZdOx4DHYNMe0dwd) with [a Flow app](https://us.flow.microsoft.com/manage/environments/1072bc6d-8e65-487f-a8e8-c6283578456a/flows/384f6125-9ef7-4a81-a88b-bf721116511a/details)
6. The google drive folder is manually shared with a service account user.
7. Ride announcements queried at build time with [Google API](https://console.developers.google.com/apis/dashboard?folder=&organizationId=&project=tnr-233319) authenticated as [the service account](https://console.developers.google.com/iam-admin/serviceaccounts/details/103768907512320484334?folder=&organizationId=&project=tnr-233319).

# Roadmap
- [x] This week's ride from email announcement
- [ ] Past days weather (helpful to know rain accumulation)
- [ ] allow people to sign up for TNR notifications.
- [x] Generate weather forecast based on this weeks ride location.
- [ ] Offline mode for low reception area.
- [ ] Embed in our ride529 website
- [ ] fetch trail condition from Trailfork

# Inspiration and references
- [CSS-tricks conference](https://github.com/CSS-Tricks/conferences)
- [CSS-tricks conference source code](https://github.com/CSS-Tricks/conferences)
- [11ty.io](https://www.11ty.io/)
