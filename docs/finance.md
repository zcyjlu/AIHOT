# 金讯金融定制

本分支基于上游 `26d436497d9ddba9e7dd88eed255cfe0105ce368`，用于独立站点。没有改动引擎、数据库迁移、付费服务或依赖版本。站名“金讯”及以下编辑初稿由使用者同意先按建议配置，法律与隐私模板仍需上线前确认。

## 内容与页面

- `site/site.ts`：站名、金融行业词、首页、分享图、关于页、Agent 搜索示例与金融资讯说明。关注理由衡量资讯价值，读者页隐藏评分，API 与后台仍保留分数。
- `industry/taxonomy.ts`：比特币、黄金置于筛选首位，兼顾宏观、股票、ETF、利率、金融业、研究、知识和观点。BTC/黄金 ETF 的产品、费用和资金流归 ETF，并附资产标签；利率决议归利率，通胀就业数据归宏观。
- `industry/topics.json`：BTC、黄金等资产主题和机构主题使用相同标签与实体目录。比特币与黄金是资产主题，不虚构为公司。
- `industry/prompts/`：金融预筛、评分例子、写作、结构化和翻译。保留五个维度及七类权重的数值、输出结构和输入安全规则；替换两项 AI 内容类型名称及领域例子。申请、批准、上市、生效分别处理，报价保留时点、币种、单位；基点不混作百分点；不写交易建议或收益承诺。
- `RELEASE = null`：金融站没有“新模型”计数；日报仍统计事件与一手信息。精选门槛维持 T1=60、T1_5=65、T2=76，尚未在金融领域校准。
- 品牌图标和金融日报报头重新生成，保留框架界面风格。报头使用项目指定的 Noto Sans SC Black（SIL OFL 1.1）。

## 来源核验与边界

2026-10-17 只读核验，不开采集任务或付费模型。下面的 RSS/Atom 均实际返回 HTTP 200 和可解析条目；这证明当次可读，不保证长期可用或再分发授权。所有源保持 `site_fulltext=false` 与 `syndicate_fulltext=false`。来源标签只是后台标记，文章分类仍由正文结构化判断。

| 来源 | 实际地址 | 核验条目 | 角色与覆盖 |
|---|---|---:|---|
| Bitcoin Core | https://bitcoincore.org/en/feed.xml | 20 | T1；比特币网络与软件公告，不代表价格新闻 |
| CoinDesk | https://www.coindesk.com/arc/outboundfeeds/rss/ | 25 | T2；比特币与加密市场；其全站流需金融预筛 |
| Cointelegraph Bitcoin | https://cointelegraph.com/rss/tag/bitcoin | 30 | T2；比特币报道，预测与推广需按噪声规则过滤 |
| ETF Trends | https://www.etftrends.com/feed/ | 50 | T2；ETF、股票与部分黄金基金；赞助内容需过滤 |
| CNBC Markets | https://www.cnbc.com/id/100003114/device/rss/rss.html | 30 | T2；股票及全球宏观市场 |
| 美联储货币政策 | https://www.federalreserve.gov/feeds/press_monetary.xml | 15 | T1；利率与政策 |
| 美联储演讲 | https://www.federalreserve.gov/feeds/speeches.xml | 15 | T1；与上一来源同属 fed，热度不算两家机构 |
| BLS CPI | https://www.bls.gov/feed/cpi.rss | 12 | T1；通胀数据 |
| 欧洲央行 | https://www.ecb.europa.eu/rss/press.html | 15 | T1；欧元区政策与利率 |

黄金一手来源使用 [世界黄金协会 Gold Focus](https://www.gold.org/goldhub/gold-focus) 当前网页：核验发现 20 个 `.m-blog-card`；文章链接为 `a.m-blog-card__copy`，标题为其 `h3`。详情页存在 JSON-LD `datePublished`，由已有 `fetchDetail` 读取，每轮最多补 8 页。没有猜测 API 或增加解析器。协会的 `rss.xml` 虽可读但首条仍为 2018 年，未采用；MINING.COM gold RSS 返回 403，未采用；其他无效地址也未启用。

官方订阅说明：[美联储](https://www.federalreserve.gov/feeds/feeds.htm)、[CoinDesk](https://www.coindesk.com/coindesk-news/2021/09/17/coindesk-rss)、[BLS](https://www.bls.gov/feed/)。公开 RSS 不能等同全文转载许可，运营者仍需确认商业使用、摘要及再分发条款。

初始源偏海外市场。A股、港股有分类与标签，但没有宣称已经接入交易所或中国媒体专属源。世界黄金协会提供部分中国黄金市场研究，不能代替 A股新闻源。

## 新部署与已有部署

建议使用独立仓库、独立数据库和新的 SITE_URL 部署。包名 `@aihot/*` 是内部框架命名，保持不变；公开 MCP 前缀为 `jinxun`。

`industry/sources.json` 只补缺失来源，既有数据库中的 AI 源不会因本次文件替换自动暂停；已有文章、标签和冻结日报也不会自动转换。已有 AI 站请先备份并在独立环境试运行，再由运营者在后台暂停旧源；不要直接覆盖现有站库。没有提供破坏性批量迁移。

开发时保持 `COLLECT_ENABLED`、`MODEL_CALLS_ENABLED`、`FEISHU_*_ENABLED`、`INDEXNOW_SUBMIT_ENABLED` 关闭。测试使用独立 `_test` / `_ci` 库以及本地模型假服务，禁止真实付费调用。

## 上线前决策

1. 确认域名、运营主体、联系方式、部署地与备案要求；填写 `site/pages/terms.md`、`privacy.md`，确认来源使用许可。当前仍明确为模板。
2. 是否补充中文 A股、港股及黄金专属源；只接已验证的 RSS/网页/接口，明确授权及费用预算。
3. 选模型、预算和出刊时间；当前保留北京时间日报 08:00、周一 10:00、每月 1 日 10:30。
4. 提供 100–200 条人工标注的金融样本，重新评估提示词与门槛。`industry/gold.example.jsonl` 是虚构格式示例，不能当作金融效果评测。
5. 是否需要实时行情。当前交付是新闻聚合与热点，未接价格 API、交易功能、资金流数据库或实时行情。

## 当前机器的采集网络限制

用项目 `fetchRss` / `fetchWebList` 直接试抓时，十个候选源均被 `Blocked private address` 拦截。本机 DNS 将这些公网域名解析到项目禁止的地址段；HTTP 下载工具可取得内容，不能据此声称项目采集已跑通。没有关闭私网保护或改写网络规则。上线时需要正常的公网 DNS，或按 `docs/deploy.md` 配置既有 `EGRESS_PROXY_URL` 路径，再在后台逐个试抓。黄金列表的选择器和详情日期已另用当次下载的实际 HTML 验证，20 条均为正文文章链接。
