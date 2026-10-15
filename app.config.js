// Extends app.json so the Firebase config file stays out of version control.
//
// Locally it sits untracked at the project root. On EAS it is a file-type
// environment variable, which expands to an absolute path at build time — hence
// reading env first and only then falling back to the local path.
module.exports = ({ config }) => ({
  ...config,
  ios: {
    ...config.ios,
    googleServicesFile: process.env.GOOGLE_SERVICES_INFO_PLIST ?? "./GoogleService-Info.plist",
  },
})
