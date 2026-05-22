# LP-13 HOMECYCLE — Image Spec for GPT Image Generation

**生成日**: 2026-05-13
**対象LP**: `portfolio/13-real-estate-purchase/index.html`
**ブランド**: HOMECYCLE（中古マンション住み替え買取）
**brand_archetype**: Warm Editorial × Editorial Minimalism
**brand_cohort**: Anthropic / Notion / Resend
**目的**: GPT (DALL-E 3 / GPT-4 Vision / GPT Image-1) で全画像を発注するためのプロンプト集

---

## 0. 共通スタイルガイド（全画像に適用）

### 美意識（必ず守る）

- **Editorial / 紙面誌的**: 派手なSaaS / 量産仲介LP / 蛍光色は禁止
- **Warm cream tones**: 背景は `#F8F4ED` (cream) / `#F1EBDF` (warm-paper) ベース
- **Vintage gold accent** (`#C9A961`) と **navy** (`#1A3D5C`) と **copper-orange** (`#D97757`) のみ
- **Generous whitespace** / 余白で品格を保つ
- **No AI face uncanny**: 人物は写真でなく editorial 線画イラスト

### 禁止リスト（grepで自動検出される項目）

- ❌ Teal (#16d5e6系) — Claude Designデフォルト色は使用不可
- ❌ 紫×シアン グラデーション
- ❌ 蛍光緑 / ど派手な原色赤
- ❌ Glassmorphism (ガラス質感)
- ❌ AI生成顔の写実画像（uncanny valley回避）
- ❌ 安っぽい不動産ストック写真感
- ❌ 文字を画像に焼き込み（テキストはHTMLで配置するため）

### 推奨ツール

- **DALL-E 3 (ChatGPT Plus)**: 写真 / イラスト両対応、品質高
- **GPT Image-1 (API)**: バッチ生成時、解像度指定可
- **画像補正**: Squoosh.app で WebP変換 + 圧縮

### ファイル命名規則

全画像は `portfolio/13-real-estate-purchase/images/` 配下に保存:

- `logo-wordmark.svg` / `logo-mark.svg` — SVGで発注（後述）
- `hero-main.webp` — 写真ベース
- `illust-XX-name.webp` — イラスト
- `case-XX-before.webp` / `case-XX-after.webp` — 事例写真
- `portrait-XX-name.webp` — 人物 editorial 線画
- `media-XX-name.svg` — メディアロゴ
- `team-XX-name.webp` — チーム portrait

各画像生成後、Squoosh で WebP（quality 80）に変換、解像度は仕様通りにリサイズ。

---

## 1. ブランド資産（4点）

### 1-1. logo-wordmark.svg

- **用途**: ヘッダー左上、Footer左、Drawer menu内
- **形式**: SVG（推奨）or PNG透過（フォールバック、横長 480×120px）
- **DESIGN.md準拠**:
  - フォント: Cormorant Garamond (serif italic) または Noto Serif JP の混合
  - レイアウト: "HOME" 上段 + horizontal divider + "CYCLE" 下段 の2段組
  - 色: navy `#1A3D5C` + gold `#C9A961` のhairline divider
- **プロンプト** (画像生成 or 手作りSVGの指針として):
  ```
  Create a refined wordmark logo for "HOMECYCLE", a premium Japanese real estate
  brokerage. Two-line stacked layout: "HOME" on top line, a thin horizontal hairline
  divider in vintage gold (#C9A961), then "CYCLE" below. Use Cormorant Garamond
  italic typeface, color navy #1A3D5C, generous letter-spacing 0.3em. Editorial
  classic trust aesthetic. Pure white or transparent background. Output as SVG-style
  flat vector design, no shadows, no gradients. Minimal, no decorative flourishes.
  ```
- **保存先**: `images/logo-wordmark.svg`

### 1-2. logo-mark.svg

- **用途**: モバイルヘッダー、Drawer menu、favicon
- **形式**: SVG、正方形 96×96px
- **コンセプト**: 既存 `.logo__mark::before` (CSS生成) を置き換える単体markアイコン
- **プロンプト**:
  ```
  Create a minimal vector logo mark for "HOMECYCLE" — a Japanese real estate brand.
  Concept: two stylized house silhouettes connected by a circular flow arrow,
  representing the cyclical home transition. Inside a thin gold circular frame
  (#C9A961). Use only navy (#1A3D5C) and vintage gold (#C9A961). Editorial
  monogram style — think Anthropic / Resend logo mark refinement. Square 96x96px,
  transparent background, flat SVG, no shadows.
  ```
- **保存先**: `images/logo-mark.svg`

### 1-3. favicon.ico

- **用途**: ブラウザタブ
- **形式**: ICO 32×32
- **作成**: `logo-mark.svg` をSquoosh / favicon.io で 32×32 ICO に変換
- **保存先**: `favicon.ico`（プロジェクトルート）

### 1-4. paper-grain.svg（SVG手生成、GPT発注不要）

- **用途**: `body::after` のpaper texture
- **既存実装あり** (line 213付近 `<feTurbulence>`)。変更不要。

---

## 2. ヒーロー（8点）

### 2-1. hero-main.webp

- **用途**: hero `.hero__bg` のメイン背景画像（現状は CSS gradient のみ）
- **配置**: 全幅 cover、parallax対応（既存JS）
- **解像度**: 2400×1600 → WebP圧縮後 ~250KB目標
- **アスペクト比**: 3:2
- **プロンプト**:
  ```
  Editorial photograph of a sun-lit, warm-toned Japanese apartment interior, late
  afternoon golden hour light streaming through tall windows onto wooden flooring
  and a wall of bookshelves with cream-colored spines. A linen sofa with two muted
  cushions, a low walnut coffee table with a single ceramic vase holding dried
  pampas grass. Wabi-sabi aesthetic meets Scandinavian editorial — think Anthropic
  brand photography crossed with Kinfolk magazine. Warm cream tones, vintage paper
  feel, NO people in frame, NO modern bright furniture, NO real estate cliche.
  Shallow depth of field, 35mm film grain texture, muted color palette dominated
  by cream #F8F4ED and warm beige #F1EBDF. Editorial classic trust mood.
  Composition: large negative space on right 40% for text overlay.
  ```
- **保存先**: `images/hero-main.webp`

### 2-2〜2-7. trust-badge アイコン（6点）

ヒーローの信頼バッジに小さなアイコンを添える。現状はテキストのみ。


| ID  | 内容       | プロンプト要素                                         |
| --- | -------- | ----------------------------------------------- |
| 2-2 | 宅建業免許    | small gold seal icon with calligraphic "S" mark |
| 2-3 | 関東圏4都県対応 | minimal map outline of Kanto area in navy lines |
| 2-4 | 秘密厳守     | vintage envelope with wax seal in gold          |
| 2-5 | 査定費用0円   | yen symbol within a delicate gold circle        |
| 2-6 | 3分で完了    | hourglass icon with sand particles in gold      |
| 2-7 | 強引な営業なし  | calm hand-drawn open palm gesture line drawing  |


**共通プロンプト テンプレ**（各バッジに適用）:

```
Minimal editorial line illustration icon, 64×64px, [SUBJECT from table above].
Style: single-weight thin lines in vintage gold (#C9A961) or navy (#1A3D5C),
on transparent or cream (#F8F4ED) background. New Yorker editorial style or
Japanese tatami-tradition restraint. NO color fills (line art only), NO shadows,
NO 3D effects. Output: flat SVG-style vector design.
```

- **保存先**: `images/trust-icon-XX.svg`（6ファイル）

### 2-8. hero-cycle-illustration.svg（既存）

既存実装あり (lines 3505-3575)。手描きSVG。変更不要。

---

## 3. お悩み (Problems) — Line illustration アイコン（5点）

各 problem-card の上部に editorial line illustration を追加。


| ID  | お悩みテーマ      | プロンプト要素                                                                        |
| --- | ----------- | ------------------------------------------------------------------------------ |
| 3-1 | 売却→次の家のジレンマ | two empty houses with a question mark balance scale between them               |
| 3-2 | 仮住まいと2度の引越し | three moving boxes stacked with a calendar showing multiple X marks            |
| 3-3 | ローン残債で諦め    | open notebook with a pen, showing a weighted scale tipping unevenly            |
| 3-4 | 内覧対応で生活崩壊   | family silhouette inside a house with multiple stranger silhouettes peering in |
| 3-5 | 適正価格が見えない   | magnifying glass over a question-marked price tag, fog-obscured background     |


**共通プロンプト**:

```
Editorial line illustration in the style of New Yorker magazine or Japanese
calligraphy. Subject: [from table above]. Single line weight in navy #1A3D5C
on transparent or pale cream background. Thin, refined hand-drawn quality.
Aspect ratio 1:1, output 600×600px PNG with transparent background.
NO color fills, NO 3D shading, NO modern flat-design vector style. Editorial,
restrained, slightly imperfect line quality (as if drawn with ink pen).
Mood: contemplative, problem-acknowledging, not alarming.
```

- **保存先**: `images/problem-XX.webp`（透過PNG→WebP変換、5ファイル）

---

## 4. 約束 (Promise) — 3 Pillar illustrations（3点）


| ID  | Pillar       | プロンプト要素                                                                                 |
| --- | ------------ | --------------------------------------------------------------------------------------- |
| 4-1 | 査定価格+15%     | upward-trending bar chart with a delicate gold crown above the highest bar              |
| 4-2 | 売却と購入を1人が並走  | two parallel paths with a single figure walking between them, threads connecting        |
| 4-3 | 仮住まい不要、引越し一度 | one home symbol with arrows merging into a singular calendar date marked with gold seal |


**共通プロンプト**:

```
Editorial line illustration, vintage gold (#C9A961) accent on navy (#1A3D5C)
line weight. Subject: [from table above]. Style: minimal architectural drawing
crossed with Japanese sumi-e ink restraint. Aspect ratio 1:1, output 800×800px
PNG transparent background. Refined hand-drawn quality, no rigid vector flatness.
NO color fills inside shapes (line art primarily), gold used only for emphasis
accents (max 15% of composition). Editorial classic trust mood.
```

- **保存先**: `images/promise-XX.webp`（3ファイル）

---





---

## 6. 選ばれる理由 (Features) — Contained editorial photos（6点）

**重要**: 現状のフルワイド `background-image` を **contained editorial photo に変更** (DESIGN.md §1 Editorial静路線維持)。
各featureに main photo (1600×900) + detail photo (800×800) の2点ずつ、合計6点。

### Feature 01: 再販前提の買取（査定価格+15%）

#### 6-1. feature-01-main.webp — メイン editorial photo

```
Editorial wide photograph (16:9, 1600×900) of a beautifully renovated Japanese
mid-century apartment interior, late afternoon. Focus on craftsmanship details:
restored wood flooring with visible grain, off-white walls with subtle paper
texture, a single architect's chair facing a wall of west-facing windows.
Style: Anthropic brand photography meets Casa BRUTUS magazine. Warm cream
palette (#F8F4ED dominant), shallow DOF, 35mm film grain.
NO people, NO clutter, NO bright modern furniture. Composition: low-angle wide
shot emphasizing horizontal lines and quiet emptiness. Mood: premium, restrained.
```

#### 6-2. feature-01-detail.webp — Detail photo (1:1)

```
Close-up editorial detail shot (1:1, 800×800) of an architect's hand holding a
fountain pen, sketching a floor plan on warm cream paper, with a vintage gold-rimmed
coffee cup just out of focus in background. Wooden desk, soft natural light.
Cropped tight on hand+pen, no face visible. Warm cream palette, 35mm film grain.
Mood: thoughtful craftsmanship, premium consulting.
```

### Feature 02: コンシェルジュ並走（同担当が売却+購入）

#### 6-3. feature-02-main.webp

```
Editorial wide photograph (16:9, 1600×900) of two architectural blueprints overlaid
on a refined wooden meeting table, alongside a single brass compass, a Japanese
woolen tape measure, and two cream porcelain teacups (one drunk from). Late morning
sunlight from upper-left. Style: Kinfolk magazine meets Japanese tea ceremony.
Warm cream tones (#F8F4ED), no people, no faces, no logos visible.
Composition: top-down 45-degree angle with generous negative space on right.
Mood: collaborative planning, restrained luxury.
```

#### 6-4. feature-02-detail.webp (1:1)

```
Editorial close-up (1:1, 800×800) of two open day planners side by side on a desk,
with a single fountain pen drawing arrows between dates on each calendar.
Cream paper, vintage gold ink. Soft natural lighting, 35mm film grain.
NO text legible (blur details to prevent reading specific words). Mood: synchronized
scheduling, deliberate planning.
```

### Feature 03: ローン残債対応（提携金融機関ネットワーク）

#### 6-5. feature-03-main.webp

```
Editorial wide photograph (16:9, 1600×900) of a refined desk scene: an open
financial planning document with multiple hand-drawn arrows in gold ink connecting
boxes (no readable text — abstract diagram lines only), a brass desk lamp casting
warm light, a wooden ruler, and a single sprig of greenery in a small ceramic vase.
Background: blurred bookshelf with leather-bound volumes. Style: Old-money Editorial
meets Japanese architect studio. Warm cream (#F8F4ED) and navy ink accents.
NO faces, NO logos, NO readable text. Mood: meticulous financial care, premium trust.
```

#### 6-6. feature-03-detail.webp (1:1)

```
Editorial close-up (1:1, 800×800) of a hand counting wooden architectural model
houses on a paper-textured surface, with a brass desk weight and a single coin
visible. Warm cream palette. Soft top-light, 35mm film grain. NO face visible.
Mood: deliberate financial counting, thoughtful balance.
```

- **保存先**: `images/feature-XX-{main,detail}.webp`（6ファイル）

---





---

## 8. 比較 (Comparison) — Diagram illustration（1点）

### 8-1. comparison-diagram.webp

- **用途**: 比較表の上部にビジュアル説明として追加
- **配置**: section title 直下、aspect 16:7
- **プロンプト**:
  ```
  Editorial diagram illustration (16:7, 1400×612px), depicting a side-by-side
  comparison of two paths: LEFT path "HOMECYCLE 買取" with a smooth horizontal
  line connecting two houses via a single gold loop. RIGHT path "一般的な仲介"
  with a jagged broken line connecting two houses via many small intermediary
  stops marked with X's. Style: New Yorker editorial diagram, navy ink (#1A3D5C)
  with vintage gold (#C9A961) accents only on the HOMECYCLE side. Cream
  background (#F8F4ED). NO text labels in image (text added in HTML separately).
  Refined, restrained, didactic.
  ```
- **保存先**: `images/comparison-diagram.webp`

---

## 9. 買取事例 (Cases) — Before/After Photos（6点）

3事例 × 2枚（before / after）。**実物件写真の代替** として、editorial mid-century renovation 写真を使用。

### Case 01: 横浜市 / 築15年 / 3LDK → 駅近マンション

#### 9-1. case-01-before.webp (4:3, 800×600)

```
Editorial photograph (4:3, 800×600) of an empty Japanese family apartment living
room before renovation. Slightly dated 2000s aesthetic — old fluorescent ceiling
light, basic beige wallpaper, sliding closet doors visible. Empty room, no furniture
or only minimal scattered items (a folded blanket on the floor). Natural side window
light. Style: documentary photo, slightly desaturated, honest, slightly faded.
Composition: wide-angle from doorway. NO people. Mood: pre-renovation honesty.
```

#### 9-2. case-01-after.webp (4:3, 800×600)

```
Editorial photograph (4:3, 800×600) of the SAME apartment after sophisticated
renovation: warm wooden flooring, off-white walls, a single linen sofa, low
wooden coffee table with one ceramic vase holding a single pampas grass stem.
Late afternoon golden light. Style: Anthropic brand photography meets MUJI
showroom. Warm cream palette dominant. NO people. Composition matches Before
photo's angle for direct comparison. Mood: premium transformation.
```

### Case 02: 武蔵小杉 / 築8年 / 2LDK → 3LDK広めリビング

#### 9-3. case-02-before.webp (4:3)

```
Editorial photo (4:3, 800×600) of a compact 2LDK Japanese apartment with a cramped
living-dining area, basic IKEA-like furniture, slightly cluttered with everyday
family items (a baby chair visible, scattered toys partially put away). Honest,
not-yet-perfect aesthetic. Natural light from window. NO people visible. Style:
documentary, sympathetic. Mood: real-family pre-transition.
```

#### 9-4. case-02-after.webp (4:3)

```
Editorial photo (4:3, 800×600) of a renovated 3LDK Japanese apartment with a
spacious living area, single low-slung sofa, plenty of clear wooden floor space
for a child to play (subtle wooden toy block in corner as detail). Warm late-morning
sunlight. Cream + warm wood palette. NO people. Style: Casa BRUTUS family-home
feature. Mood: room to grow, calm family life.
```

### Case 03: 浦安市 / 築18年 / 4LDKマンション → 戸建て

#### 9-5. case-03-before.webp (4:3)

```
Editorial photo (4:3, 800×600) of a Japanese mid-rise apartment building exterior,
viewed from outside on a cloudy day. Older 2000s-era beige tile facade, balconies
visible with mild family items (one futon hanging to dry on a distant balcony).
Honest, no embellishment. Mood: pre-decision urban apartment life.
```

#### 9-6. case-03-after.webp (4:3)

```
Editorial photo (4:3, 800×600) of a refined modern Japanese two-story detached
home exterior in a quiet suburban neighborhood. Warm wood + white plaster facade,
a small garden with a single tree, soft late-afternoon light. Style: Casa BRUTUS
architecture feature. Cream + wood palette. NO people. Mood: suburban family
transition, premium quietude.
```

- **保存先**: `images/case-XX-{before,after}.webp`（6ファイル）

---

## 10. お客様の声 (Testimonials) — Editorial portrait illustrations（3点）

**重要**: AI写真の顔は uncanny になるため、**editorial line portrait illustration** で発注。


| ID   | お客様           | 描写                                                                                                                                    |
| ---- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 10-1 | 田中様（35歳・3人家族） | a man in his mid-30s in a knit sweater, gentle smile, holding a coffee cup, looking thoughtfully off-frame                            |
| 10-2 | 山田様（48歳・4人家族） | a man in his late 40s in a tailored shirt, reading-glasses perched on nose, looking down at a document with calm focus                |
| 10-3 | 佐藤様（42歳・2人家族） | a woman in her early 40s, hair tied back, sitting on a sofa with one knee tucked, looking at a child (off-frame) with quiet affection |


**共通プロンプト**:

```
Editorial line portrait illustration, 600×600px (1:1), [SUBJECT from table above].
Style: hand-drawn ink line portrait in the manner of New Yorker magazine illustrator
crossed with Japanese sumi-e portraiture. Single-weight thin lines in navy #1A3D5C
with vintage gold (#C9A961) used sparingly for one accent detail (a coffee cup rim,
a sweater stripe, etc.). On cream (#F8F4ED) background. NOT photorealistic — must be
clearly illustrated, restrained, slightly imperfect linework. NO eyes drawn in
detail (use gentle line suggestions). NO color fills, only line work. NO modern
flat-vector style. Mood: contemplative, real-person dignity, not AI-generated.
Composition: shoulders-up portrait, gentle 3/4 angle.
```

- **保存先**: `images/portrait-XX.webp`（3ファイル）

---





---

## 12. チーム/会社 (Team) — 新規セクション（2点）

LP-13 v5 で新規追加。Trust強化のため代表者紹介 + オフィスシーン。

### 12-1. team-representative.webp

- **用途**: 代表者 editorial portrait illustration
- **アスペクト比**: 4:5（縦長 portrait）、解像度 800×1000px
- **プロンプト**:
  ```
  Editorial line portrait illustration (4:5, 800×1000px) of a Japanese man in his
  late 40s, the representative director of "HOMECYCLE" real estate brokerage.
  Wearing a charcoal cardigan over a white shirt (no tie — premium-casual look),
  hair neatly side-parted with mild gray temples, reading-glasses in shirt pocket.
  Standing 3/4 angle, hands gently clasped in front. Background: blurred suggestion
  of a bookshelf and a hanging architectural drawing. Style: New Yorker illustrator
  crossed with Japanese editorial portraiture. Single-weight navy (#1A3D5C) lines
  with vintage gold (#C9A961) only on one accent (a cardigan button, a watch).
  Cream background (#F8F4ED). NOT photorealistic — clearly hand-drawn editorial.
  Mood: trustworthy industry veteran, calm authority, premium restraint.
  ```
- **保存先**: `images/team-representative.webp`

### 12-2. team-office.webp

- **用途**: オフィス空間の editorial photo
- **アスペクト比**: 3:2（横長）、解像度 1600×1067px
- **プロンプト**:
  ```
  Editorial photograph (3:2, 1600×1067px) of a refined Japanese real estate
  consultancy office interior, no people visible. Wooden meeting table center-frame
  with two cream linen chairs, a wall of bookshelves with leather-bound volumes
  and architectural model houses, a single brass desk lamp on the corner. Soft
  natural light from upper-left tall windows. Warm cream palette dominant (#F8F4ED)
  with navy (#1A3D5C) accent in two leather chair backs. Style: Anthropic office
  meets Japanese architect's studio. NO people, NO computer screens visible,
  NO modern bright office aesthetic. Mood: thoughtful consulting space, premium
  trust. 35mm film grain texture.
  ```
- **保存先**: `images/team-office.webp`

---





---

## 全画像 — 発注チェックリスト

### ブランド資産（4）

- 1-1 logo-wordmark.svg
- 1-2 logo-mark.svg
- 1-3 favicon.ico
- 1-4 paper-grain.svg（既存、変更なし）

### ヒーロー（8）

- 2-1 hero-main.webp
- 2-2〜2-7 trust-icon-{01..06}.svg
- 2-8 hero-cycle illustration（既存、変更なし）

### お悩み（5）

- 3-1〜3-5 problem-{01..05}.webp

### 約束（3）

- 4-1〜4-3 promise-{01..03}.webp

### 数字（4）

- 5-1〜5-4 number-icon-{01..04}.svg

### 選ばれる理由（6）

- 6-1〜6-2 feature-01-{main,detail}.webp
- 6-3〜6-4 feature-02-{main,detail}.webp
- 6-5〜6-6 feature-03-{main,detail}.webp

### 流れ（6）

- 7-1〜7-6 flow-icon-{01..06}.svg

### 比較（1）

- 8-1 comparison-diagram.webp

### 買取事例（6）

- 9-1〜9-2 case-01-{before,after}.webp
- 9-3〜9-4 case-02-{before,after}.webp
- 9-5〜9-6 case-03-{before,after}.webp

### お客様の声（3）

- 10-1〜10-3 portrait-{01..03}.webp

### メディア掲載（6 — 新規）

- 11-1〜11-6 media-{01..06}-name.svg

### チーム/会社（2 — 新規）

- 12-1 team-representative.webp
- 12-2 team-office.webp

### CTA（1）

- 13-1 cta-scene.webp

---

## 合計


| 種別                              | 数   | 主用ツール                            |
| ------------------------------- | --- | -------------------------------- |
| SVG ベクター（ロゴ・アイコン）               | 23  | DALL-E 3 → SVGトレース or 手書きSVG     |
| 編集写真風 photo (webp)              | 24  | DALL-E 3 / GPT Image-1（写実プロンプト）  |
| 線画 portrait/illustration (webp) | 6   | DALL-E 3（New Yorker style プロンプト） |


**合計 53 slots / 51 GPT発注**（paper-grain.svg と hero-cycle SVG は既存）

---

## 発注運用 Tips

### 1. バッチ発注の効率化

DALL-E 3 / GPT-4 Vision (Plus) は **連続生成で文脈を保持する**。
**共通スタイル"を最初の数往復で確立してから個別生成**すると整合性が出る。

おすすめ発注順:

1. **共通スタイル確立**: 「これからHOMECYCLEというLPの全画像を発注する。スタイルガイドはこれ→」（上記 §0 を貼り付け、サンプル1枚生成してOK出す）
2. **ブランド資産** (logo / mark) — 数往復で確立
3. **同系統まとめて**: trust-icons 6個 → problem 5個 → promise 3個 → number 4個 → flow 6個 を順に
4. **photo系まとめて**: hero → feature 6枚 → case 6枚 → cta scene
5. **portrait系まとめて**: testimonial 3 → team representative

### 2. 受け取った画像の処理フロー

```
DALL-E 3 出力 PNG (1024×1024 or 1792×1024)
  ↓ Squoosh.app (WebP, quality 80)
images/[filename].webp
  ↓ /lp-image で <picture> 挿入時、最終リサイズ
完成
```

### 3. 品質判定基準

各画像生成後、以下3項目をチェック:

- **色の整合性**: 禁止色（teal/紫シアン/蛍光色）が混入していない
- **AI slop指紋**: 不自然な手指/顔/文字焼き込みがない
- **brand_cohort整合**: Anthropic / Notion / Resend の画像と並べて違和感ない

NG なら同じプロンプトに `"avoid: teal, vibrant colors, generic stock photo feel"` を追加して再生成。

### 4. ファイル命名規則の徹底

LP-13 HTML側は `data-prompt-id="2-1"` のような ID で slot を識別する。
**画像ファイル名と data-prompt-id を必ず1:1対応** させてください。混乱回避のため。

---

## 補足: AI slop banlist（このLPで必ず避けるべきAI画像の癖）

- ❌ 「不動産」と言われて出る generic な住宅外観（白い箱ハウス）
- ❌ 笑顔の家族AI写真（uncanny valley）
- ❌ "Modern minimalist" として出る無印化された量産的インテリア
- ❌ teal / aqua / 蛍光緑 のアクセント
- ❌ 不自然な複数の手指（DALL-E の頻発バグ）
- ❌ 浮いている文字（特に日本語の崩れた焼き込み）

これらが出たら**即再生成**。スタイルガイドに `"NO: smiling families, white-box generic houses, modern flat decor"` を追加。

---

## 改訂履歴


| 版    | 日付         | 改訂内容                                  |
| ---- | ---------- | ------------------------------------- |
| v1.0 | 2026-05-13 | 初版 — 53 image slots / 51 GPT発注プロンプト整備 |


