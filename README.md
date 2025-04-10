# Application ports

- 6000 - Marketing
- 6001 - Admin
- 6002 - Tenant
- 6003 - Portal
- 7000 - API

# Introduction

Welcome to Onboardex(Wearable NFTs),
The revolutionary NFT Minting Platform-as-a-Service (PAAS) designed to transform the commercial industry. Our platform enables E-commerce platforms to effortlessly mint unique and valuable NFTs for each order placed by their consumers, adding a new level of personalization and exclusivity to their product offerings.

### Purpose:

Our purpose is to provide a seamless and user-friendly solution for e-commerce platforms to integrate NFT minting capabilities into their existing platforms. By leveraging our platform's API, admins can easily mint NFTs as soon as they launch a product, establishing a direct connection between their products and the digital asset ecosystem.

### Benefits:

- Exclusive NFTs: Offer exclusive and collectible NFTs that resonate with your consumers. Each order placed becomes an opportunity to provide a unique digital asset associated with the purchased product.
- Enhanced Customer Engagement: Capture the attention and loyalty of customers by offering personalized and limited-edition digital assets. NFTs can serve as a token of appreciation and way to create sense of ownership.

With our platform, tap into the next big **paradigm shift from centralized to decentralized systems** leveraging the value to enhance e-commerce offerings.

# Getting Started

### Sign Up and Access:

- Visit our website and navigate to the ‘Admin Sign Up’ page.
- Provide the necessary details to create your account. This may include your name, email address, and password.
- After successfully signing up, you will receive a confirmation email with further instructions.

### API Key Generation:

- Log in to your account using your credentials.
- Once logged in, navigate to the ‘plans’ section and upon purchasing a plan, an API key will be sent to registered email.
- Make sure to securely store API key as it will be required for authentication and authorization when interacting with our platform's API.

Note: The API key serves as a secure token that allows you to access and make authorized requests to our API. Treat your API key as a confidential credential and avoid sharing it publicly.

# Integration Guide

### Use Cases:

Explore how our product can enhance functionality, boost customer engagement, and unlock new opportunities. Some potential use cases include:

1. Personalized NFTs: Integrate Wearable-NFT to offer personalized and unique NFTs associated with each product. Engage customers with limited-edition digital assets that create a sense of exclusivity and ownership.
2. Loyalty Programs: Seamlessly integrate with your loyalty program to reward customers with exclusive NFTs. Provide incentives and recognition for their loyalty, fostering long-term engagement and customer satisfaction.
3. Limited-Edition Releases: Leverage to launch limited-edition product releases with associated NFTs. Create a sense of scarcity and excitement among customers, driving demand and boosting sales.

### Overview:

<img src="/assets/dash1.png" width="800" height="400">

The diagram highlights how our platform enables e-commerce platforms to seamlessly integrate NFT minting capabilities, offering exclusive and personalized digital assets to customers

### Integration Benefits:

Discover the advantages and value proposition of integrating Wearable-NFT into your existing systems or services. Unlock a range of benefits that include:

- Increased Customer Engagement: Elevate the customer experience by offering personalized and valuable NFTs. Strengthen brand loyalty and foster a deeper connection with your customers.
- Enhanced Functionality: Seamlessly integrate NFT minting capabilities into your platform, adding a new dimension to your product offerings. Differentiate yourself from competitors and provide unique value to your customers.
- Revenue Generation: Monetize the NFT ecosystem by leveraging the growing interest and demand for digital collectibles. Open up new revenue streams and capitalize on the expanding market.

### API Endpoints:

Gain a comprehensive understanding of the available API endpoints provided by Wearable-NFT. The API allows you to interact with our platform and perform various actions. The endpoint enables you to manage orders, mint NFTs, and retrieve NFT details. Refer to the API documentation for more information.

### Data Exchange:

Ensure seamless communication with Wearable-NFT's API by adhering to our data exchange requirements. We support JSON as the standard data format for requests and responses. Ensure data validation and consider appropriate encoding and encryption mechanisms to maintain security.

### Integration Examples:

Get started quickly with our integration examples. We provide step-by-step instructions and guidelines to assist you in the integration process. Explore our GitHub repository for code snippets and ready-to-use resources in various programming languages.

# Developer Guide

### Architecture:

<img src="/assets/flow.png" width="600" height="400">

The diagram visualizes how these components interact each other with external platform and the blockchain network. This diagram helps developers understand the overall system structure and the flow of data and requests during the integration process.

### API Documentation:

To interact with Wearable-NFT, developers can leverage our comprehensive API.

### Rate Limits and Usage Guidelines:

To maintain fair usage and ensure system stability, Wearable-NFT may have rate limits or usage restrictions.

- Rate Limits: Specify the allowed number of requests per minute, hour, or day.
- Usage Guidelines: Explain any additional guidelines or restrictions developers should be aware of when utilizing the API.
- Monitoring: Guide developers on how to monitor their API usage and handle rate limit exceeded scenarios.

### API Endpoint:

1. **/api/main**

The **`/api/main`** endpoint is a crucial part of integrating Wearable-NFT into your application. It is called when a customer places an order, and it triggers the sending of an email with a link to claim the respective NFT. The endpoint requires the following payload parameters:

- email: The email address of the customer who placed the order.
- apiKey: Your unique API key for authentication and authorization.
- productId: The ID of the product associated with the order.

The request payload should be sent as a JSON object in the body of the API request.

**Example API Request:**

```
POST /api/main
Content-Type: application/json
Authorization: Bearer {apiKey}

{
  "email": "customer@example.com",
  "apiKey": "your_api_key",
  "productId": "12345"
}
```

**Example API Response:**

```
jsonCopy code
{
  "status": "success",
  "message": "Email sent successfully."
}
```

### Authentication:

To ensure secure and authorized access, Wearable-NFT supports API key-based authentication. To authenticate your requests, include the API key in the **`Authorization`** header of your API calls. Use the following format:

```
Authorization: Bearer {apiKey}
```

Replace **`{apiKey}`** with your actual API key.

### Rate Limits and Usage Guidelines:

To maintain fair usage and ensure system stability, rate limits are imposed on API requests. The rate limits are as follows:

- Maximum Requests per Minute: 100
- Maximum Requests per Hour: 1000

Please adhere to these limits to avoid disruptions in service. If you require higher limits or have specific usage requirements, please contact our support team.

### Support and Resources:

We understand that developers may have questions or require assistance during the integration process. Our documentation provides resources such as:

- Support Channels: Explain how developers can seek support, including documentation, FAQs, community forums, or dedicated support channels.
- Additional Resources: Provide links to tutorials, blog posts, video guides, or any other relevant resources to further assist developers.

# Contact Information

For any support, inquiries, or partnership opportunities, our contact information is readily available. You can reach out to us via:

- Email: For general inquiries or technical support, contact [support@wearablenft.com](mailto:support@yourproduct.com).
- Support Portal: Visit our dedicated support portal at support.wearablenft.com for documentation, FAQs, and community forums.
- Partnership Opportunities: If you are interested in partnering with us, please reach out to [partnerships@wearablenft.com](mailto:partnerships@yourproduct.com).

We are committed to providing prompt and helpful support to ensure a smooth integration experience. Don't hesitate to contact us if you have any questions or require assistance.

# 🛠️ Fullstack Web3 E-commerce Monorepo

This repository houses a fullstack Web3-powered e-commerce platform using a modern monorepo architecture. It includes backend services, frontend applications for various user roles, blockchain smart contracts, and a headless commerce system—all orchestrated with **Turborepo** and **PNPM**.

---

## 📁 Project Structure Overview

This monorepo is managed using **Turborepo**, with workspaces defined via `pnpm-workspace.yaml`. The structure includes:

- **Backend** – NestJS API with multi-tenancy and blockchain integrations.
- **Frontend** – Multiple Next.js apps tailored for different user types.
- **Blockchain** – Hardhat project for smart contract development.
- **Store** – Medusa e-commerce backend with storefront.
- **Shared Packages** – Reusable UI components, TypeScript configs, and linting rules.

---

## 🧩 Key Components & Their Roles

### 🔙 Backend (`apps/backend`)

- **Tech**: NestJS (TypeScript)
- **Features**:
  - Modular architecture (`admin`, `auth`, `tenants`, `users`)
  - Database access via Prisma
  - Blockchain interaction via ABI files
  - Email templates for transactional messaging
  - JWT & Magic Link authentication
  - Multi-tenant management
  - Admin/User role separation

---

### 🖥️ Frontend Applications (`apps/frontend`)

Built with **Next.js**, each app serves a specific purpose:

#### 🛠️ Admin

- Tenant/client management dashboard
- Auth via **NextAuth**

#### 📢 Marketing

- Public website
- Company info, blog, and case studies

#### 🏢 Tenant

- Business-facing portal
- NFT minting, analytics, transactions

#### 👤 User

- End-user interface
- NFT claiming, profile management

---

### ⛓️ Blockchain (`blockchain/hardhat`)

- **Smart Contracts**:
  - `MintContract.sol`
  - `MintFactory.sol`
- Deployment scripts & testing
- ABI files shared with backend for integration

---

### 🛍️ Store (`store/wearable-nft*`)

- **Platform**: Medusa (headless commerce)
- Custom admin workflows
- NFT minting triggered by e-commerce activity
- Storefront built with **Next.js**

---

### 📦 Shared Packages (`packages/`)

- `eslint-config-custom`: Shared linting setup
- `tsconfig`: Unified TypeScript settings
- `ui`: Shared UI components used across frontends

---

## 🔁 How Components Work Together

### 🔐 Authentication Flow

- Frontends use **NextAuth**
- Backend handles auth with **JWT** and **magic links**
- Shared user types ensure consistent handling

### ⛓️ Blockchain Integration

- Contracts deployed via Hardhat
- Backend accesses them through ABI files
- Frontends trigger blockchain actions via API

### 🛒 E-commerce Flow

- Medusa manages products & orders
- Storefront displays products and handles checkout
- NFT minting tied to purchases

### 🏢 Multi-tenancy

- Backend manages tenant accounts and data
- Admin app handles onboarding
- Tenant app delivers tailored interfaces

### 🧬 Shared Codebase

- Shared UI components across all apps
- Consistent dev experience via unified linting/TypeScript
- Shared types ensure type safety between backend & frontend

---

## 🛠️ Development Workflow

- **Turborepo** manages caching, builds, and testing across packages
- **PNPM** handles monorepo package management
- Apps can be developed and tested independently
- Changes in shared packages propagate automatically

---

## 🔗 Key Integration Points

- Backend API powers all frontend applications
