<div align="center">
  <br/>
  <h1> <b>Hacked Aurora Hexo Theme</b></h1>
  <strong>Highly modified, maybe broken</strong>
</div>

<br/>

<p align="center">
  <img src="https://img.shields.io/github/stars/auroral-ui/hexo-theme-aurora">
  <img src="https://img.shields.io/github/forks/auroral-ui/hexo-theme-aurora">
  <img src="https://img.shields.io/github/issues/auroral-ui/hexo-theme-aurora">
  <img src="https://img.shields.io/npm/v/hexo-theme-aurora">
  <img src="https://img.shields.io/npm/dy/hexo-theme-aurora">
  <img src="https://img.shields.io/github/last-commit/auroral-ui/hexo-theme-aurora/main">
  <img src="https://img.shields.io/github/license/auroral-ui/hexo-theme-aurora">
  <img src="https://img.shields.io/circleci/build/github/auroral-ui/hexo-theme-aurora/main">
</p>

<div align="center">

**[Preview](https://codeismagic.com)** |
**[Change Log](https://github.com/adminy/hexo-theme-aurora/blob/main/CHANGELOG.md)** |
**[Document](https://aurora.tridiamond.tech)**

</div>

Aurora is a next generation theme using Aurora colours and UI elements. It give you the feel of smooth flow of colours and a futuristic feeling.

> This theme can be installed by using NPM or Yarn since version 1.1.0+, please check the [usage document](https://aurora.tridiamond.tech) for more details.

---
> Installing:
- Clone this repository into your `themes` folder or `yarn add git@github.com:adminy/hexo-theme-aurora.git`
- copy `_config.aurora.yml` from `themes/_config.yml` or `node_modules/hexo-theme-aurora/_config.yml`
- change your default `theme:` in `_config.yml` to `hexo-theme-aurora` or `aurora`, not sure which

<br/>

![](https://img-blog.csdnimg.cn/202103280030531.png)

![](https://img-blog.csdnimg.cn/20210328003140590.png)

### ⭐️ Features

- Featured section - _Can add a feature meta to any post, those will be pinned into the feature section on the home page._
- Multi-language support - _Can dynamically switch the language of the main texts in the application._
- Statistics - _Statistic of article words, posts, categories and tags counts._
- Article reading time - _Show the estimated reading time of an article._
- Mathjax support - _Support mathjax syntax in markdown files._
- SPA - _No page loading or freezing from page to page._
- Comment plugins - _Support the using Gitalk or Valine plugins_
- Comment plugins - _Support the using Gitalk or Valine plugins_
- Blog search - _Enable to search all the articles in the blog._
- Latest comments - _Added a widget showing the latest comments, supported using `Gitalk` or `Valine`._

<br><br>

### 🎨 Theme

- Light and dark - _Light and dark theme support._
- Magazine Layout - _Modern magazine grid layout._
- Gradient Colours - _Modern gradient colour styles_.
- Timeline styled archives - _Archived posts into a timeline format_.

<br><br>

### 🛠 Configuration

- Beian Config - _This feature is especially for China users, for those that need to put Beian info at the footer of the blog._
- Customizable menu - _Can customize your menu with internal links, external links, custom pages._
- Post navigation - _Can navigate to the previous and next article at the end of the article page._
- Custom pages - _Can add any custom pages, need to use the customized menu to display in the menu._
- Page navbar - _Can set up a sidebar on the specific page, act as the sub-menu of the page._

<br><br>

## 🚀 What is yet to come?

- Related posts - _Show a list of the related posts at the end of an article. _

<br><br>

## ⚠️ Fix node errors
This can run with the latest node.js version, with some tolerable warnings and the following:
```bash
rm -rf node_modules yarn.lock
yarn install -std=c++17 --ignore-engines
```
