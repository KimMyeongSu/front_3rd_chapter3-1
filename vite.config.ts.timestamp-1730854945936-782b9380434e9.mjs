// vite.config.ts
import react from "file:///C:/Project/front_3rd_chapter3-1/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.1_vite@5.4.10_@types+node@22.8.1_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///C:/Project/front_3rd_chapter3-1/node_modules/.pnpm/vite@5.4.10_@types+node@22.8.1/node_modules/vite/dist/node/index.js";
import { defineConfig as defineTestConfig, mergeConfig } from "file:///C:/Project/front_3rd_chapter3-1/node_modules/.pnpm/vitest@2.1.3_@types+node@22.8.1_@vitest+ui@1.6.0_jsdom@25.0.1_msw@2.5.1_@types+node@22.8.1_typescript@5.6.3_/node_modules/vitest/dist/config.js";
var vite_config_default = mergeConfig(
  defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true
        }
      }
    }
  }),
  defineTestConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      coverage: {
        reportsDirectory: "./.coverage",
        reporter: ["lcov", "json", "json-summary"]
      }
    }
  })
);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxQcm9qZWN0XFxcXGZyb250XzNyZF9jaGFwdGVyMy0xXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxQcm9qZWN0XFxcXGZyb250XzNyZF9jaGFwdGVyMy0xXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Qcm9qZWN0L2Zyb250XzNyZF9jaGFwdGVyMy0xL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgYXMgZGVmaW5lVGVzdENvbmZpZywgbWVyZ2VDb25maWcgfSBmcm9tICd2aXRlc3QvY29uZmlnJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1lcmdlQ29uZmlnKFxyXG4gIGRlZmluZUNvbmZpZyh7XHJcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAnL2FwaSc6IHtcclxuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSksXHJcbiAgZGVmaW5lVGVzdENvbmZpZyh7XHJcbiAgICB0ZXN0OiB7XHJcbiAgICAgIGdsb2JhbHM6IHRydWUsXHJcbiAgICAgIGVudmlyb25tZW50OiAnanNkb20nLFxyXG4gICAgICBzZXR1cEZpbGVzOiAnLi9zcmMvc2V0dXBUZXN0cy50cycsXHJcbiAgICAgIGNvdmVyYWdlOiB7XHJcbiAgICAgICAgcmVwb3J0c0RpcmVjdG9yeTogJy4vLmNvdmVyYWdlJyxcclxuICAgICAgICByZXBvcnRlcjogWydsY292JywgJ2pzb24nLCAnanNvbi1zdW1tYXJ5J10sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0pXHJcbik7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVIsT0FBTyxXQUFXO0FBQ3ZTLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZ0JBQWdCLGtCQUFrQixtQkFBbUI7QUFFOUQsSUFBTyxzQkFBUTtBQUFBLEVBQ2IsYUFBYTtBQUFBLElBQ1gsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLElBQ2pCLFFBQVE7QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNMLFFBQVE7QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxRQUNoQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQUEsRUFDRCxpQkFBaUI7QUFBQSxJQUNmLE1BQU07QUFBQSxNQUNKLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxRQUNSLGtCQUFrQjtBQUFBLFFBQ2xCLFVBQVUsQ0FBQyxRQUFRLFFBQVEsY0FBYztBQUFBLE1BQzNDO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
