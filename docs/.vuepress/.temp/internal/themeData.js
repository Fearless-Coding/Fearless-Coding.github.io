export const themeData = JSON.parse("{\"navbar\":[{\"text\":\"Java8\",\"link\":\"/guide/Java8新特性.md\"},{\"text\":\"Group\",\"children\":[{\"text\":\"SubGroup\",\"children\":[\"/group/sub/foo.md\",\"/group/sub/bar.md\"]}]},{\"text\":\"Group 2\",\"children\":[{\"text\":\"Always active\",\"link\":\"/\",\"activeMatch\":\"/\"},{\"text\":\"Active on /foo/\",\"link\":\"/not-foo/\",\"activeMatch\":\"^/foo/\"}]}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebar\":\"auto\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
