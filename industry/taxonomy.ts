// 这个行业的分类体系：类别、标签词表、公司（主体）名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 换行业时：类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉结构抽取模型这一类收什么、
 * 和相邻类别的边界在哪（总的归类原则写在 prompts/structure.md 里）。
 * commentary 标出评论类（教程、观点）：日报写过的事又有评论类的后续报道，只占一行快讯（报道它的信源够多时除外）。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 * feedLabel 是分类 RSS 标题里的名字（不写就用 label）。公开接口、RSS 和 MCP 里要把一类并进另一类发布，写在站点设置里（site/site.ts 的 PUBLIC_CATEGORIES）。
 */
export const CATEGORIES = [
  { key: "bitcoin", label: "比特币", section: "比特币", guide: "比特币网络、矿业、托管、市场结构、机构采用与相关监管。BTC ETF 的设立、申赎或费用归 ETF，同时标比特币；只顺带提到 BTC 不归此类。" },
  { key: "gold", label: "黄金", section: "黄金", guide: "黄金现货与期货、央行购金、供需、储备与贵金属市场。黄金 ETF 的设立与资金流归 ETF，同时标黄金；矿企财报以股票为主。" },
  { key: "macro", label: "宏观", section: "宏观与利率", guide: "通胀、就业、增长、财政、贸易及影响金融市场的地缘事件。央行利率决定、债券收益率与货币政策归利率。" },
  { key: "stocks", label: "股票", section: "股票与 ETF", guide: "美股、A股、港股及其他股票市场的指数、财报、上市、回购与公司重大经营变化；基金产品本身归 ETF。" },
  { key: "etf", label: "ETF", section: "股票与 ETF", guide: "ETF 的申请、批准、上市、费用、持仓、申赎和资金流；区分现货与期货、申请与获批，标明相关资产。" },
  { key: "rates", label: "利率", section: "宏观与利率", guide: "央行货币政策、利率决议、资产负债表、国债收益率、实际利率、利差与汇率政策。机构预测必须明确归因。" },
  { key: "industry", label: "金融业", section: "金融业与监管", guide: "金融机构、交易所、支付、金融监管、执法、市场基础设施及其他数字资产的重要变化；有明确资产主线时优先归对应资产类别。" },
  { key: "paper", label: "研究", section: "研究与解读", guide: "有方法和证据的金融、经济、市场研究或统计报告；常规数据发布按宏观或对应资产归类。" },
  { key: "tip", label: "知识", section: "研究与解读", guide: "可复用的金融知识、数据阅读和风险管理方法；不收荐股、带单或交易信号广告。", commentary: true },
  { key: "opinion", label: "观点", section: "研究与解读", guide: "重点是作者的市场分析、预测、评论或访谈判断；已发生的政策与资产事件不因带有观点而归此类。", commentary: true },
] as const satisfies ReadonlyArray<{ key: string; label: string; feedLabel?: string; section: string; guide: string; commentary?: true }>;

/** 金融行业没有与新模型发布对应的统一计数。 */
export const RELEASE: { category: string; tag: string; unit: string } | null = null;

export const PLAIN_TERMS: readonly string[] = ["btc", "bitcoin", "gold", "etf", "gdp", "cpi", "ppi", "fomc", "ipo", "usd", "nav"];

export const ITEM_TYPES = ["policy_release", "product_launch", "tool_or_method", "research_paper", "industry_event", "opinion_analysis", "tutorial_explainer"] as const;

export const CATEGORY_TAGS = ["政策/监管", "产品更新", "数据/统计", "论文/研究", "教程/实践", "市场分析", "现象/趋势", "行业动态", "安全/风险", "其他"] as const;
export const TOPIC_TAGS = ["比特币", "黄金", "宏观经济", "美股", "A股", "港股", "ETF", "利率", "债券", "外汇", "通胀", "就业", "央行购金", "资金流", "加密资产", "市场结构"] as const;
export const ENTITY_TAGS = ["美联储", "欧洲央行", "美国劳工统计局", "美国SEC", "世界黄金协会", "BlackRock", "Vanguard", "CME", "Coinbase"] as const;

export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  BTC: "比特币", Bitcoin: "比特币", bitcoin: "比特币", Gold: "黄金", gold: "黄金", XAU: "黄金",
  宏观: "宏观经济", 美债: "债券", 国债: "债券", 加息: "利率", 降息: "利率", 货币政策: "利率",
  CPI: "通胀", 非农: "就业", 交易所交易基金: "ETF",
  监管: "政策/监管", 政策: "政策/监管", 法规: "政策/监管", 安全: "安全/风险",
  分析: "市场分析", 观点: "市场分析", 趋势: "现象/趋势", 教程: "教程/实践", 指南: "教程/实践",
  研究: "论文/研究", paper: "论文/研究", 统计: "数据/统计", 融资: "行业动态", 并购: "行业动态",
  Fed: "美联储", ECB: "欧洲央行", SEC: "美国SEC", 贝莱德: "BlackRock", 先锋领航: "Vanguard",
};

export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[]; otherNames?: string[] }> = {
  fed: { name: "美联储", displayTag: "美联储", aliases: ["美联储", "Federal Reserve", "FOMC", "Fed"], otherNames: ["Federal Open Market Committee"] },
  ecb: { name: "欧洲央行", displayTag: "欧洲央行", aliases: ["欧洲央行", "European Central Bank", "ECB"] },
  bls: { name: "美国劳工统计局", displayTag: "美国劳工统计局", aliases: ["美国劳工统计局", "Bureau of Labor Statistics", "BLS"] },
  sec: { name: "美国SEC", displayTag: "美国SEC", aliases: ["美国SEC", "美国证券交易委员会", "Securities and Exchange Commission", "SEC"] },
  wgc: { name: "世界黄金协会", displayTag: "世界黄金协会", aliases: ["世界黄金协会", "World Gold Council", "WGC"] },
  marketwatch: { name: "MarketWatch", displayTag: null, aliases: ["MarketWatch", "市场观察"] },
  blackrock: { name: "BlackRock", displayTag: "BlackRock", aliases: ["BlackRock", "贝莱德", "iShares"], otherNames: ["IBIT", "iShares Bitcoin Trust"] },
  vanguard: { name: "Vanguard", displayTag: "Vanguard", aliases: ["Vanguard", "先锋领航"] },
  cme: { name: "CME", displayTag: "CME", aliases: ["CME", "CME Group", "芝商所"], otherNames: ["COMEX"] },
  coinbase: { name: "Coinbase", displayTag: "Coinbase", aliases: ["Coinbase"] },
};

/** 标题摘要里的机构须有原文依据，不把出版方自动当成新闻主体。 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "fed", name: "美联储", patterns: [/美联储|federal reserve|\bfomc\b|\bfed\b/i] },
  { id: "ecb", name: "欧洲央行", patterns: [/欧洲央行|european central bank|\becb\b/i] },
  { id: "bls", name: "美国劳工统计局", patterns: [/美国劳工统计局|bureau of labor statistics|\bbls\b/i] },
  { id: "sec", name: "美国SEC", patterns: [/美国SEC|美国证券交易委员会|securities and exchange commission|\bSEC\b/] },
  { id: "wgc", name: "世界黄金协会", patterns: [/世界黄金协会|world gold council|\bwgc\b/i] },
  { id: "blackrock", name: "BlackRock", patterns: [/blackrock|贝莱德|ishares|\bibit\b/i] },
  { id: "vanguard", name: "Vanguard", patterns: [/\bvanguard\b|先锋领航/i] },
  { id: "cme", name: "CME", patterns: [/\bcme\b|芝商所|\bcomex\b/i] },
  { id: "coinbase", name: "Coinbase", patterns: [/\bcoinbase\b/i] },
];

export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "fed", domains: ["federalreserve.gov"] },
  { entityId: "ecb", domains: ["ecb.europa.eu"] },
  { entityId: "bls", domains: ["bls.gov"] },
  { entityId: "sec", domains: ["sec.gov"] },
  { entityId: "wgc", domains: ["gold.org"] },
  { entityId: "blackrock", domains: ["blackrock.com", "ishares.com"] },
  { entityId: "vanguard", domains: ["vanguard.com"] },
  { entityId: "cme", domains: ["cmegroup.com"] },
  { entityId: "coinbase", domains: ["coinbase.com"] },
];
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [];
