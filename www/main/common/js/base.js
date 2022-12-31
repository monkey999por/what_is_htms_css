const globalNavilinks = {
  home: "/index.html",
  aboutMe: "/about/index.html",
  portfolios: "/portfolio/index.html",
  contact: "/contact/index.html",
  wizard: "/portfolio/03.html",
  wordpress: "/portfolio/02.html",
  cafe: "/portfolio/01.html",
};

const PAGE_INFO = [
  // 上側のグローバルリンク
  {
    path: globalNavilinks.home,
    item: {
      title: "Home",
      breadcrumb: [globalNavilinks.home],
    },
  },
  {
    path: globalNavilinks.aboutMe,
    item: {
      title: "About me",
      breadcrumb: [globalNavilinks.home],
    },
  },
  {
    path: globalNavilinks.portfolios,
    item: {
      title: "Portfolios",
      breadcrumb: [globalNavilinks.home],
    },
  },
  {
    path: globalNavilinks.contact,
    item: {
      title: "Contact",
      breadcrumb: [globalNavilinks.home],
    },
  },

  // つくったものの下
  {
    path: globalNavilinks.cafe,
    item: {
      title: "Cafe Debut",
      breadcrumb: [globalNavilinks.home, globalNavilinks.portfolios],
    },
  },
  {
    path: globalNavilinks.wizard,
    item: {
      title: "wizard who wants to be a gresshopper",
      breadcrumb: [globalNavilinks.home, globalNavilinks.portfolios],
    },
  },
  {
    path: globalNavilinks.wordpress,
    item: {
      title: "wordpress design book",
      breadcrumb: [globalNavilinks.home, globalNavilinks.portfolios],
    },
  },
];

const pagePath = location.pathname;

/**
 * @returns {@PAGE_INFO[n].item}
 */
const getPageInfo = (path) => {
  const item = PAGE_INFO.filter((o) => o.path === (path ? path : pagePath))[0]
    ?.item;
  return item
    ? item
    : PAGE_INFO.filter((o) => o.path === globalNavilinks.home)[0]?.item;
};

const isRoot = () => {
  return pagePath === globalNavilinks.home || pagePath === "/";
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    /**
     * create page title
     */
    document.querySelector("head title").innerText = getPageInfo().title;

    /**
     * 一番上のヘッダ生成
     */
    const sampleHead = document.querySelector(".sampleHead");
    sampleHead.innerHTML =
      "<h1> HTML / CSS design textbook sample to learn while making</h1>";

    /**
     * ヘッダのコンテンツを追加
     */
    const headerItem = document.querySelector("#headerItem");
    headerItem.innerHTML += `
    <header id="pageHead">
       <h1 id="siteTitle">komorikomasha</h1>
      <p id="catchcopy">What we cannot do alone, we can do together. 3 fun creations that give shape
        to
        what you want to try.</p>
    </header>
    <nav id="globalNavi">
        <ul>
            <li><a ${isRoot() ? 'class="current"' : ""} href="${
      globalNavilinks.home
    }">home</a></li>

            <li><a ${
              globalNavilinks.aboutMe === pagePath ? 'class="current"' : ""
            } href="${globalNavilinks.aboutMe}">about me</a></li>
            <li><a ${
              pagePath.match(/portfolio/g) ? 'class="current"' : ""
            } href="${globalNavilinks.portfolios}">portfolios</a></li>
            <li><a ${
              globalNavilinks.contact === pagePath ? 'class="current"' : ""
            } href="${globalNavilinks.contact}">contact</a></li>
        </ul>
    </nav>`;

    /**
     * パンくずリストを表示
     */
    if (!isRoot()) {
      const topicPath = document.querySelector(".topicPath");
      // TODO: auto create link
      const linkContent = "";
      let breadcrumbStr = "";

      const crumbLists = getPageInfo().breadcrumb;
      crumbLists.forEach((path, index) => {
        const title = getPageInfo(path)?.title;
        breadcrumbStr += `<a href="${path}">${title}</a> ${
          crumbLists.length > index ? "&gt;" : ""
        } `;
      });
      breadcrumbStr += getPageInfo().title;
      topicPath.innerHTML = breadcrumbStr;
    }
    /**
     * add page title
     */
    if (!isRoot()) {
      const pageTitle = document.querySelector(".pageTitle");
      pageTitle.textContent = `${getPageInfo()?.title}`;
    }
    /**
     * 他に作ったもののリンクを追加
     */
    if (
      !isRoot() &&
      pagePath !== globalNavilinks.aboutMe &&
      pagePath !== globalNavilinks.contact
    ) {
      const otherMakes = document.querySelector("#otherMakes");
      otherMakes.innerHTML = `
    <ul>
      <li><a href="${globalNavilinks.wizard}">Wizard who wants to be a grasshopper</a></li>
      <li><a href="${globalNavilinks.wordpress}">WordPress design workbook</a></li>
      <li><a href="${globalNavilinks.cafe}">Cafe Debut</a></li>
    </ul>`;
    }
    /**
     * サイドのニュースリストを追加
     */
    if (!isRoot()) {
      const newsList = document.querySelector("#pageBodySub .newsList");
      newsList.innerHTML = `
    <h2>News</h2>
    <ul>
        <li>
            <time datetime="2013-10-01">2013/10/1</time>
            Comomo and Moriko are writing a book titled "HTML/CSS textbook (tentative title)". looking
            forward to.
        </li>
        <li>
            <time datetime="2013-10-01">2013-10-1</time>
            Comomo, Moriko, and Hiromasa have opened a website called "komorikomash".
        </li>
    </ul>`;
    }

    /**
     * copyright
     */
    const pageFoot = document.querySelector("#pageFoot");
    pageFoot.innerHTML = `<p id="copyright"><small>Copyright&copy; 2013 @komorikomasha All Rights Reserved.</small></p>`;
  },
  false
);
