# 海外向けカードショップ - システム設計書

## 1. プロジェクト概要

### 1.1 目的
CardShop-Shinsokuの構造を参考に、海外市場向けのトレーディングカード専門ECサイトを構築

### 1.2 主要機能
- 多言語対応（英語メイン、日本語サブ）
- Wise API統合による国際決済
- トレーディングカード特化の在庫管理
- PSA/BGS鑑定済カード対応
- リアルタイム在庫表示
- 国際配送料自動計算

## 2. 技術スタック

### Frontend
```
- Framework: Next.js 14 (App Router)
- Language: TypeScript 5.x
- Styling: Tailwind CSS + Shadcn/ui
- State Management: Zustand
- Form Handling: React Hook Form + Zod
- API Client: TanStack Query
- i18n: next-i18next
```

### Backend
```
- Runtime: Node.js 20 LTS
- API: Next.js API Routes / tRPC
- ORM: Prisma 5
- Database: PostgreSQL 16
- Cache: Redis
- File Storage: AWS S3 / Cloudinary
```

### Infrastructure
```
- Hosting: Vercel / AWS
- CDN: Cloudflare
- Monitoring: Sentry
- Analytics: Google Analytics 4 + Plausible
```

### External Services
```
- Payment: Wise API
- Email: SendGrid / Resend
- SMS: Twilio (optional)
- Search: Algolia / MeiliSearch
```

## 3. システムアーキテクチャ

### 3.1 レイヤー構造
```
┌─────────────────────────────────────┐
│         Frontend (Next.js)          │
├─────────────────────────────────────┤
│         API Layer (tRPC)            │
├─────────────────────────────────────┤
│      Business Logic Layer           │
├─────────────────────────────────────┤
│        Data Access Layer            │
│           (Prisma ORM)              │
├─────────────────────────────────────┤
│     Database (PostgreSQL)           │
└─────────────────────────────────────┘
```

### 3.2 マイクロサービス構成
```
- Main App Service (Next.js)
- Payment Service (Wise Integration)
- Inventory Service (Stock Management)
- Notification Service (Email/SMS)
- Search Service (Algolia)
- Image Service (CDN/Optimization)
```

## 4. データベース設計

### 4.1 主要テーブル

#### Users
```sql
- id: UUID
- email: String (unique)
- password_hash: String
- name: String
- country: String
- language: String
- created_at: DateTime
- updated_at: DateTime
```

#### Products (Cards)
```sql
- id: UUID
- sku: String (unique)
- name_en: String
- name_ja: String
- category_id: UUID
- game_type: Enum
- card_set: String
- card_number: String
- rarity: String
- condition: Enum
- psa_grade: Float?
- bgs_grade: Float?
- price_usd: Decimal
- price_jpy: Decimal
- stock_quantity: Integer
- images: JSON
- created_at: DateTime
- updated_at: DateTime
```

#### Categories
```sql
- id: UUID
- name_en: String
- name_ja: String
- slug: String (unique)
- parent_id: UUID?
- sort_order: Integer
```

#### Orders
```sql
- id: UUID
- order_number: String (unique)
- user_id: UUID
- status: Enum
- subtotal: Decimal
- tax: Decimal
- shipping: Decimal
- total: Decimal
- currency: String
- wise_payment_id: String?
- shipping_address: JSON
- created_at: DateTime
- updated_at: DateTime
```

#### OrderItems
```sql
- id: UUID
- order_id: UUID
- product_id: UUID
- quantity: Integer
- price: Decimal
- total: Decimal
```

## 5. API設計

### 5.1 RESTful Endpoints

#### Products
```
GET    /api/products          - List products
GET    /api/products/:id      - Get product details
GET    /api/products/search   - Search products
POST   /api/products          - Create product (Admin)
PUT    /api/products/:id      - Update product (Admin)
DELETE /api/products/:id      - Delete product (Admin)
```

#### Cart
```
GET    /api/cart              - Get cart items
POST   /api/cart/items        - Add to cart
PUT    /api/cart/items/:id    - Update quantity
DELETE /api/cart/items/:id    - Remove from cart
POST   /api/cart/checkout     - Proceed to checkout
```

#### Orders
```
GET    /api/orders            - List user orders
GET    /api/orders/:id        - Get order details
POST   /api/orders            - Create order
PUT    /api/orders/:id        - Update order status (Admin)
```

#### Payment (Wise Integration)
```
POST   /api/payment/create    - Initialize Wise payment
POST   /api/payment/confirm   - Confirm payment
GET    /api/payment/status    - Check payment status
POST   /api/payment/webhook   - Wise webhook handler
```

### 5.2 tRPC Procedures

```typescript
// Product procedures
product.list
product.getById
product.search
product.create (admin)
product.update (admin)

// Cart procedures
cart.get
cart.addItem
cart.updateItem
cart.removeItem
cart.clear

// Order procedures
order.create
order.list
order.getById
order.updateStatus (admin)

// Payment procedures
payment.createSession
payment.confirmPayment
payment.getStatus
```

## 6. セキュリティ設計

### 6.1 認証・認可
- JWT Bearer Token認証
- Role-based Access Control (RBAC)
- 2FA対応 (TOTP)

### 6.2 データ保護
- HTTPS必須
- データベース暗号化
- PCI DSS準拠（カード情報非保存）
- GDPR/CCPA対応

### 6.3 セキュリティヘッダー
```
- Content-Security-Policy
- X-Frame-Options
- X-Content-Type-Options
- Strict-Transport-Security
```

## 7. 多言語対応設計

### 7.1 サポート言語
- English (en) - Primary
- 日本語 (ja) - Secondary
- 中国語 (zh) - Future
- 韓国語 (ko) - Future

### 7.2 実装方法
```typescript
// i18n configuration
{
  defaultLocale: 'en',
  locales: ['en', 'ja'],
  localeDetection: true
}
```

## 8. Wise決済統合

### 8.1 決済フロー
1. カート確認
2. 配送先情報入力
3. Wise APIで決済セッション作成
4. ユーザーをWise決済ページへリダイレクト
5. 決済完了後、コールバックで注文確定
6. 注文確認メール送信

### 8.2 必要なWise API
- Create Quote
- Create Transfer
- Fund Transfer
- Get Transfer Status
- Webhook Integration

## 9. パフォーマンス最適化

### 9.1 フロントエンド
- Next.js Image Optimization
- Dynamic Imports
- Bundle Splitting
- Service Worker Cache
- CDN配信

### 9.2 バックエンド
- Query Optimization (Prisma)
- Redis Cache Layer
- Database Indexing
- API Response Compression
- Rate Limiting

## 10. デプロイメント戦略

### 10.1 環境構成
- Development (local)
- Staging (Vercel Preview)
- Production (Vercel/AWS)

### 10.2 CI/CD Pipeline
```yaml
1. Code Push → GitHub
2. Automated Testing (Jest, Cypress)
3. Build & Lint Check
4. Deploy to Staging
5. Manual Approval
6. Deploy to Production
7. Health Check
```

## 11. モニタリング・分析

### 11.1 監視項目
- Application Performance (Sentry)
- Server Metrics (Vercel Analytics)
- Database Performance
- API Response Times
- Payment Success Rate
- User Behavior (GA4)

## 12. プロジェクト構造

```
card-shop-international/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # i18n routes
│   │   ├── api/                # API routes
│   │   └── admin/              # Admin panel
│   ├── components/             # React components
│   │   ├── ui/                 # UI components
│   │   ├── layouts/            # Layout components
│   │   └── features/           # Feature components
│   ├── lib/                    # Utility libraries
│   │   ├── db/                 # Database utilities
│   │   ├── api/                # API clients
│   │   └── utils/              # Helper functions
│   ├── hooks/                  # Custom React hooks
│   ├── stores/                 # Zustand stores
│   ├── server/                 # Server-side code
│   │   ├── api/                # tRPC routers
│   │   └── services/           # Business logic
│   ├── types/                  # TypeScript types
│   └── styles/                 # Global styles
├── prisma/                     # Database schema
├── public/                     # Static assets
├── tests/                      # Test files
├── docker/                     # Docker configs
└── docs/                       # Documentation
```

## 次のステップ

1. Miyabiプロジェクトにこの設計をIssueとして登録
2. 各コンポーネントの詳細設計
3. プロトタイプ開発開始
4. Wise API統合のPOC作成