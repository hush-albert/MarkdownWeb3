// 安全的 API 配置管理
// 避免在前端硬編碼敏感資訊

/**
 * API 配置類
 */
class ApiConfig {
    constructor() {
        this.baseUrl = this.determineBaseUrl();
        this.endpoints = {
            chat: '/api/aigc',
            upload: '/api/identify'
        };
        this.timeout = 30000; // 30 秒超時
    }

    /**
     * 根據環境決定 API 基礎 URL
     * @returns {string} API 基礎 URL
     */
    determineBaseUrl() {
        // 從環境變數或配置文件讀取（如果有的話）
        if (window.API_BASE_URL) {
            return window.API_BASE_URL;
        }

        // 根據主機名決定
        const hostname = window.location.hostname;
        
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            // 開發環境：直接使用本地 API
            return 'http://localhost:8080';
        }
        else if (hostname === 'hush-albert.github.io') {
            return 'https://aws.holymap.com.tw';
        }
        else {
            // 默認使用相對路徑（如果 API 在同一域名下）
            return '';
        }
    }

    /**
     * 獲取完整的 API URL
     * @param {string} endpoint - 端點名稱
     * @returns {string} 完整的 URL
     */
    getUrl(endpoint) {
        if (!this.endpoints[endpoint]) {
            throw new Error(`未知的 API 端點: ${endpoint}`);
        }
        return this.baseUrl + this.endpoints[endpoint];
    }

    /**
     * 獲取請求配置
     * @param {string} method - HTTP 方法
     * @param {Object} options - 額外選項
     * @returns {Object} fetch 配置對象
     */
    getRequestConfig(method = 'GET', options = {}) {
        const config = {
            method: method.toUpperCase(),
            headers: {
                'Accept': 'application/json',
                ...options.headers
            },
            timeout: this.timeout,
            ...options
        };

        // 添加 CSRF 防護頭（如果可用）
        const csrfToken = this.getCsrfToken();
        if (csrfToken) {
            config.headers['X-CSRF-Token'] = csrfToken;
        }

        return config;
    }

    /**
     * 獲取 CSRF 令牌（如果有設置）
     * @returns {string|null} CSRF 令牌
     */
    getCsrfToken() {
        // 從 meta 標籤讀取
        const csrfMeta = document.querySelector('meta[name="csrf-token"]');
        if (csrfMeta) {
            return csrfMeta.getAttribute('content');
        }

        // 從 cookie 讀取
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'csrf_token') {
                return decodeURIComponent(value);
            }
        }

        return null;
    }

    /**
     * 檢查 API 是否可用
     * @returns {Promise<boolean>} API 可用性
     */
    async checkApiHealth() {
        try {
            const response = await fetch(this.baseUrl + '/health', {
                method: 'GET',
                timeout: 5000
            });
            return response.ok;
        } catch (error) {
            return false;
        }
    }
}

// 創建配置實例
const apiConfig = new ApiConfig();

// 導出配置
export default apiConfig;

// 也導出一些常用方法
export const getApiUrl = (endpoint) => apiConfig.getUrl(endpoint);
export const getRequestConfig = (method, options) => apiConfig.getRequestConfig(method, options);