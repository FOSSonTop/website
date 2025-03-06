import { defineConfig } from 'vitepress'
import { withSidebar } from 'vitepress-sidebar';
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
function genSidebarConfig(doc: string){
  return {
    documentRootPath: 'docs',
    scanStartPath: doc,
    resolvePath: `/${doc}/`,
    collapsed: false,
    hyphenToSpace: true,
    capitalizeEachWords: true,
    underscoreToSpace: true,
    includeEmptyFolder: false,
    sortMenusByName: false,
    excludePattern: ['README**'],
    sortMenusByFrontmatterOrder: true,
    includeFolderIndexFile: true,
    useTitleFromFrontmatter: true
  }
};

const vitePressSidebarOptions = [genSidebarConfig("aosp"), genSidebarConfig("crave"), genSidebarConfig("gamedev/assets"), genSidebarConfig("gamedev/godot")]

const vitePressOptions = {
  title: "FOSSonTop",
  description: "OSS is always on top. Always.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'AOSP Docs', link: '/aosp/' },
      { text: 'Crave.io Docs', link: '/crave/' },
      { text: 'Game Development Guides', link: '/gamedev/' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/FOSSonTop' }
    ],
    cleanUrls: true,
    lastUpdated: true,
    editLink: {
      pattern: ({ filePath }) => {
        const repo = filePath.split("/")[0]
	const rest = filePath.split("/").slice(1).join("/")
        return `https://github.dev/FOSSonTop/${repo}/blob/master/${rest}`
      }
    },
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy: 0.3
          }
        }
      }
    }
  }
}

const config = defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions))
const configWithMermaid = withMermaid(config)

export default configWithMermaid
