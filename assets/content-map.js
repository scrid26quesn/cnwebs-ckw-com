// assets/content-map.js
// Site content sections, keyword tags, and search filtering

const siteConfig = {
  baseUrl: 'https://cnwebs-ckw.com',
  name: '彩客',
  version: '1.0.0'
};

const contentSections = [
  {
    id: 'home',
    title: '首页',
    keywords: ['彩客', '首页', '资讯', '推荐'],
    items: [
      { title: '热门推荐', url: '/hot', tags: ['热门', '推荐'] },
      { title: '最新动态', url: '/news', tags: ['动态', '更新'] }
    ]
  },
  {
    id: 'products',
    title: '产品中心',
    keywords: ['彩客', '产品', '服务', '方案'],
    items: [
      { title: '基础版', url: '/products/basic', tags: ['基础', '入门'] },
      { title: '专业版', url: '/products/pro', tags: ['专业', '高级'] },
      { title: '企业版', url: '/products/enterprise', tags: ['企业', '定制'] }
    ]
  },
  {
    id: 'support',
    title: '技术支持',
    keywords: ['彩客', '技术', '支持', '帮助'],
    items: [
      { title: '常见问题', url: '/support/faq', tags: ['FAQ', '问题'] },
      { title: '文档中心', url: '/support/docs', tags: ['文档', '手册'] },
      { title: '联系客服', url: '/support/contact', tags: ['客服', '联系'] }
    ]
  },
  {
    id: 'about',
    title: '关于我们',
    keywords: ['彩客', '公司', '介绍', '团队'],
    items: [
      { title: '公司简介', url: '/about/intro', tags: ['简介', '背景'] },
      { title: '团队成员', url: '/about/team', tags: ['团队', '成员'] },
      { title: '联系方式', url: '/about/contact', tags: ['联系', '地址'] }
    ]
  }
];

function searchContent(searchTerm) {
  if (!searchTerm || typeof searchTerm !== 'string') {
    return [];
  }
  
  const term = searchTerm.trim().toLowerCase();
  if (term.length === 0) {
    return [];
  }

  const results = [];

  for (const section of contentSections) {
    const sectionMatch = section.keywords.some(kw => 
      kw.toLowerCase().includes(term) || term.includes(kw.toLowerCase())
    );

    if (sectionMatch) {
      results.push({
        section: section.title,
        items: section.items,
        matchType: 'section'
      });
      continue;
    }

    const matchedItems = section.items.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(term);
      const urlMatch = item.url.toLowerCase().includes(term);
      const tagMatch = item.tags.some(tag => 
        tag.toLowerCase().includes(term) || term.includes(tag.toLowerCase())
      );
      return titleMatch || urlMatch || tagMatch;
    });

    if (matchedItems.length > 0) {
      results.push({
        section: section.title,
        items: matchedItems,
        matchType: 'item'
      });
    }
  }

  return results;
}

function filterByTag(tagName) {
  if (!tagName || typeof tagName !== 'string') {
    return [];
  }

  const tag = tagName.trim().toLowerCase();
  if (tag.length === 0) {
    return [];
  }

  const filtered = [];

  for (const section of contentSections) {
    const itemsWithTag = section.items.filter(item =>
      item.tags.some(t => t.toLowerCase() === tag)
    );

    if (itemsWithTag.length > 0) {
      filtered.push({
        section: section.title,
        sectionId: section.id,
        items: itemsWithTag
      });
    }
  }

  return filtered;
}

function getAllTags() {
  const tagSet = new Set();
  
  for (const section of contentSections) {
    for (const item of section.items) {
      for (const tag of item.tags) {
        tagSet.add(tag);
      }
    }
  }

  return Array.from(tagSet).sort();
}

function getSectionByUrl(url) {
  if (!url || typeof url !== 'string') {
    return null;
  }

  const cleanUrl = url.trim();
  
  for (const section of contentSections) {
    for (const item of section.items) {
      if (item.url === cleanUrl) {
        return {
          section: section.title,
          sectionId: section.id,
          item: item
        };
      }
    }
  }

  return null;
}

// Example usage (for testing in Node.js or browser console):
// console.log(searchContent('彩客'));
// console.log(filterByTag('文档'));
// console.log(getAllTags());
// console.log(getSectionByUrl('/products/pro'));

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    siteConfig,
    contentSections,
    searchContent,
    filterByTag,
    getAllTags,
    getSectionByUrl
  };
}