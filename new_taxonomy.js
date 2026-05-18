/* =================== TAXONOMY · 11 categories · ~209 items === */
const TAXONOMY = [
  { key:"A", name:"入场 & 转场", items:[
    { l:"字符级 stagger 入场（GSAP SplitText）", d:"demo1" },
    { l:"全屏路由切换幕布（Rive 状态机）", d:"demo11" },
    { l:"预加载门（点击仪式 Load Norris）", extra:"preloader" },
    { l:"椭圆 clip-path 收缩揭示", d:"demo1" },
    { l:"SVG morph 过场（一形变另一形）" },
    { l:"滚动方向感知入场（向下 / 向上不同动画）" },
    { l:"Logo 写字 / 描线入场（stroke-dashoffset）" },
    { l:"多层 section stagger 进场" },
    { l:"Onboarding 首次访问引导" },
    { l:"真路由切换（Taxi.js / Barba / View Transitions API）" },
    { l:"Typewriter 打字机标题进场" },
    { l:"Cookies / privacy 横幅优雅入场" },
    { l:"加载进度条（不只是 spinner）" }
  ]},
  { key:"B", name:"滚动驱动", items:[
    { l:"Scrub 3D 模型滚动驱动旋转", d:"demo3" },
    { l:"横向 pin scroll（1 纵屏 = 多横屏）", d:"demo4" },
    { l:"velocity-aware marquee（速度敏感）", d:"demo5" },
    { l:"滚动驱动色彩补间（hex 渐变）", d:"demo15" },
    { l:"Rive scrub · SVG path 绘制", d:"demo19svg" },
    { l:"章节滚动进度条 scaleX", d:"demo24" },
    { l:"CSS 双向无限 marquee（零 JS）", d:"demo28" },
    { l:"视差多层背景 parallax（不同层不同速度）" },
    { l:"滚动驱动 Three.js 相机移动 / 缩放" },
    { l:"滚动驱动 video.currentTime（帧步进）" },
    { l:"滚动驱动 Lottie 帧" },
    { l:"文字 morph 多布局（FLIP + 滚动）" },
    { l:"Mask reveal · 圆形扩散下一屏" },
    { l:"Stack cards 堆叠揭示（叠纸效果）" },
    { l:"反向滚动揭示（往上滚出现彩蛋）" },
    { l:"scroll-snap 强制对齐章节" },
    { l:"滚动 hue-rotate / 滤镜变化" },
    { l:"滚动 SVG path d morph 形状变化" },
    { l:"滚动 X% 触发一次性事件" },
    { l:"滚动方向变化反弹（弹簧）" },
    { l:"CSS scroll-driven animations API (view())" },
    { l:"Hero release · 从 fixed 释放到 flow" },
    { l:"长文阅读进度（按章节 / 按字数）" },
    { l:"多层 sticky 堆叠 header（一行接一行）" },
    { l:"ScrollTrigger.snap 自动吸附章节" },
    { l:"滚到底自动加载下一批（infinite scroll）" },
    { l:"滚动暂停背景视频" },
    { l:"滚动 fixed → absolute 转换（hero 解锁）" }
  ]},
  { key:"C", name:"导航 & 主题", items:[
    { l:"隐形哨兵 div 切 nav 主题", d:"demo2" },
    { l:"Footer 三色主题随 section 切", d:"demo21" },
    { l:"Focus mode 分类筛选（页面级）", extra:"focus mode" },
    { l:"Sticky nav 滚动时缩小（高度/字号收敛）" },
    { l:"Nav 透明度随 hero 进度" },
    { l:"滚到底自动隐藏 nav，往上滚显示" },
    { l:"全屏 mega-menu 展开" },
    { l:"Hamburger 转 close 的 SVG morph" },
    { l:"Auto-TOC 实时高亮当前 section" },
    { l:"View Transitions API（原生跨页）" },
    { l:"Drawer 侧滑菜单（带遮罩）" },
    { l:"Nav link hover underline magic move" },
    { l:"主题切换器 dark / light / system" },
    { l:"多语言切换器（带保留滚动位置）" },
    { l:"Sub-section dot navigator（右侧锚点）" }
  ]},
  { key:"D", name:"微动效", subgroups:[
    { name:"按钮 Buttons", items:[
      { l:"Rive 按钮 4 件套（rotate / invert / scale / shake）", d:"demo22" },
      { l:"磁力按钮 magnetic（鼠标吸引 + lerp）", d:"demo26" },
      { l:"Hold-to-transition 按住 0.6s 触发", d:"demo30" },
      { l:"按钮 ripple 涟漪（Material 风）" },
      { l:"按钮 hover 背景从一侧滑入填充" },
      { l:"按钮 hover 箭头跟随光标方向" },
      { l:"按钮按下时 inset shadow 内陷" },
      { l:"按钮 loading 态（文字变 spinner）" },
      { l:"按钮 success 态（✓ 替换 + 反色）" },
      { l:"按钮 disabled 平滑过渡（灰度 + 不可点）" }
    ]},
    { name:"链接 / 文本 Links & Text", items:[
      { l:"字符级 hover 翻页（每字 stagger）", d:"demo18" },
      { l:"Rive 状态机 hover 切赛道路径", d:"demo6" },
      { l:"链接下划线从左到右画出" },
      { l:"链接 hover 整词翻面（cube flip）" },
      { l:"文本 typewriter 打字机" },
      { l:"文本 glitch / scramble 随机替换" },
      { l:"文本 hover 字符随机抖动" },
      { l:"Read more 文字展开 / 折叠" },
      { l:"文本 hover 出现波浪下划线" },
      { l:"SVG icon hover 路径描线绘制" }
    ]},
    { name:"表单控件 Form Controls", items:[
      { l:"Checkbox 描边变实心 + 对勾绘制" },
      { l:"Toggle switch 反弹滑块（spring）" },
      { l:"Radio button 涟漪选中" },
      { l:"Slider 拖拽手柄 scale + 浮动 label" },
      { l:"Range dual handle slider（双手柄）" },
      { l:"Input focus 标签上浮（floating label）" },
      { l:"Input 实时校验 + 错误抖动" },
      { l:"Autocomplete 下拉项 stagger 进入" },
      { l:"多按钮组 magic line underline 滑动" },
      { l:"Pill / chip 选中态过渡" }
    ]},
    { name:"反馈与状态 Feedback", items:[
      { l:"Modal 弹窗优雅入场 + backdrop blur" },
      { l:"Modal confirm 摇晃强调（错误反馈）" },
      { l:"Toast 通知滑入 + auto-dismiss" },
      { l:"Tooltip hover delay + 智能定位" },
      { l:"Tooltip arrow 自动反转（智能边界）" },
      { l:"Skeleton loader 骨架闪烁 wave" },
      { l:"Empty state 插画 + 引导" },
      { l:"Notification badge 弹出动画" },
      { l:"Cursor 弹簧延迟跟随" },
      { l:"Like / heart 跳动 + 粒子飞溅" }
    ]}
  ]},
  { key:"E", name:"数据驱动", items:[
    { l:"倒计时翻页数字（每秒 flip）", d:"demo12" },
    { l:"CMS 日历切换（prev / next 字段绑定）", d:"demo19" },
    { l:"滚动触发数字计数器（0 → N）", d:"demo27" },
    { l:"Realtime fetch + 渲染（赛事成绩同步）" },
    { l:"数据图表（D3 / Chart.js）动效绘制" },
    { l:"localStorage 设置持久化（偏好）" },
    { l:"Multi-step form 进度条 + 切换" },
    { l:"WebSocket 实时 push（直播 + 进度）" },
    { l:"Optimistic UI（先显示成功后台同步）" },
    { l:"Undo / redo 操作历史栈" },
    { l:"URL state sync 双向（filter / scroll）" },
    { l:"自动保存（debounce 1s）+ 状态指示" },
    { l:"Filter chain 多条件 AND/OR 组合" },
    { l:"多人 cursor 显示（presence indicator）" }
  ]},
  { key:"F", name:"手势 & 光标", items:[
    { l:"Tap to lock 移动端模态手势", d:"demo8" },
    { l:"自定义光标 + 区域 reveal", d:"demo9" },
    { l:"菜单图片 blend-mode cursor 跟随", d:"demo17" },
    { l:"Swipe 滑动左右识别（slider）" },
    { l:"Pinch zoom 双指缩放" },
    { l:"列表拖拽排序（drag handle + auto-scroll）" },
    { l:"Drag-and-drop 文件上传区（hover 高亮）" },
    { l:"Cursor trail 光标轨迹" },
    { l:"卡片 3D tilt 鼠标跟随" },
    { l:"拖拽惯性 inertia（甩出去）" },
    { l:"Pointer events 笔压 / 笔触" },
    { l:"鼠标进入页面方向感知（top/left）" },
    { l:"右键自定义菜单（context menu）" },
    { l:"双指旋转手势（rotate gesture）" },
    { l:"长按弹出预览（mobile）" }
  ]},
  { key:"G", name:"视觉系统", subgroups:[
    { name:"字体与排版 Typography", items:[
      { l:"1728 流体 clamp 字号系统", d:"demo7" },
      { l:"椭圆轨迹大字（字符沿弧排列）", d:"demo13" },
      { l:"Variable Font 双轴（wght + wdth）", d:"demo20" },
      { l:"滚动驱动字宽变化（wdth axis sync）", d:"demo29" },
      { l:"-webkit-text-stroke 描边字" },
      { l:"CSS counter 自动编号样式" },
      { l:"Multi-line text-wrap: balance" },
      { l:"Drop cap 首字母下沉" }
    ]},
    { name:"布局与形状 Layout & Shape", items:[
      { l:"GSAP FLIP 布局变形（First-Last-Invert-Play）", d:"demo14" },
      { l:"SVG mask 异形容器（凹缺 / 切角）", d:"demo16" },
      { l:"CSS Subgrid 子网格" },
      { l:"Container Queries 容器响应式" },
      { l:"scroll-snap 水平 / 垂直轮播" },
      { l:"shape-outside 文字绕图" },
      { l:"clip-path polygon 复杂多边形" },
      { l:"aspect-ratio + object-fit 图组合" },
      { l:"CSS anchor positioning（原生 tooltip）" },
      { l:"Custom scrollbar 美化" }
    ]},
    { name:"视觉特效 Effects", items:[
      { l:"conic-gradient 圆盘 / 仪表盘" },
      { l:"backdrop-filter blur 玻璃感" },
      { l:"mix-blend-mode 多层叠（difference / multiply）" },
      { l:"CSS filter（hue-rotate / invert / sepia）" },
      { l:"SVG filter feTurbulence 噪声" },
      { l:"SVG filter feDisplacementMap 扭曲" },
      { l:"CSS @property 自定义属性补间" },
      { l:"CSS view() animation-timeline（进入视口）" },
      { l:"Noise overlay 颗粒（赛博朋克 grain）" },
      { l:"Liquid morph blob（SVG 路径流体）" },
      { l:"Aurora 极光渐变 + 动画" },
      { l:"Glassmorphism 三层玻璃" },
      { l:"3D CSS card flip（transform-style preserve-3d）" },
      { l:"Holographic 彩虹反射（gradient + blend）" }
    ]}
  ]},
  { key:"H", name:"媒体", items:[
    { l:"Hover 自动播放视频（lazy-load）", d:"demo10" },
    { l:"Stat hover 大图淡入", d:"demo23" },
    { l:"视频静音 / 解除静音切换" },
    { l:"自定义视频播放进度条 + 时间码" },
    { l:"WebM 透明通道（alpha 视频）" },
    { l:"Image hover zoom + 视差移动" },
    { l:"Lightbox 点图全屏 + 键盘切换" },
    { l:"Before / after 图片对比滑块" },
    { l:"360° 全景图查看器" },
    { l:"Audio play on hover" },
    { l:"Web Audio API 频谱可视化" },
    { l:"Video as hero background + autoplay muted" },
    { l:"Image dithering 像素化滤镜" },
    { l:"Picture-in-picture 模式（小窗）" },
    { l:"Sprite sheet animation（帧序列）" },
    { l:"Animated WebP / APNG 替代 GIF" },
    { l:"Image scrubber（拖动播放序列）" },
    { l:"Adaptive streaming HLS / DASH" }
  ]},
  { key:"I", name:"性能", items:[
    { l:"prefers-reduced-motion 降级所有动画" },
    { l:"rel=preload / preconnect 关键字体" },
    { l:"CSS contain: layout/paint 优化" },
    { l:"will-change 提示合成层" },
    { l:"IntersectionObserver 替代 scroll handler" },
    { l:"requestIdleCallback 闲时计算" },
    { l:"Service Worker 离线 + 静态缓存" },
    { l:"关键 CSS inline（避免阻塞首屏）" },
    { l:"Web Worker 后台计算（大数据排序）" },
    { l:"Code splitting + dynamic import()" }
  ]},
  { key:"K", name:"无障碍", items:[
    { l:"Screen-reader 隐藏视觉 h1（语义+视觉解耦）", extra:"原站做法" },
    { l:":focus-visible 自定义键盘焦点环" },
    { l:"ARIA live regions（动态内容通知）" },
    { l:"aria-busy 加载状态告知" },
    { l:"Skip links 跳过 nav 直达主内容" },
    { l:"全键盘可达（Tab 顺序 + 焦点陷阱）" },
    { l:"prefers-color-scheme 自适应主题" },
    { l:"Color contrast 4.5:1 合规" },
    { l:"Image alt text 系统化" },
    { l:"Form 标签关联 + 错误关联" },
    { l:"高对比度 / Windows forced colors 支持" },
    { l:"Lighthouse a11y > 95 自动监控" }
  ]},
  { key:"J", name:"高级 3D / WebGL", items:[
    { l:"Three.js + GLTF + Draco 压缩模型" },
    { l:"HDRI 三套环境光按 section 切换" },
    { l:"EffectComposer + UnrealBloom + FXAA 后期" },
    { l:"Custom GLSL shader（vertex + fragment）" },
    { l:"Particles / instanced mesh 大量物体" },
    { l:"React Three Fiber + drei 工具集" },
    { l:"WebXR / AR 模式（手机直接 AR）" },
    { l:"Texture compression（KTX2 / Basis）" },
    { l:"Shadow maps 实时阴影" },
    { l:"Cannon.js / Rapier 物理引擎" },
    { l:"Skinned animation 骨骼绑定" },
    { l:"WebGPU 探索（替代 WebGL）" }
  ]}
];

(function renderTaxonomy(){
  const grid = document.getElementById('taxonomyGrid');
  const summary = document.getElementById('taxSummary');
  if (!grid || !summary) return;
  function demoNum(demoId){
    const el = document.querySelector('#' + demoId + ' .num');
    if (!el) return '';
    const m = /^(\d+)/.exec(el.textContent.trim());
    return m ? m[1] : '';
  }
  function isDone(i){ return !!(i.d || i.extra); }
  function renderItems(items){
    return items.map(i => {
      const done = isDone(i);
      let numHtml = '';
      if (i.d) {
        const n = demoNum(i.d);
        if (n) numHtml = `<span class="tax-num"><a href="#${i.d}">#${n}</a></span>`;
      } else if (i.extra) {
        numHtml = `<span class="tax-num tax-extra">· ${i.extra}</span>`;
      }
      return `<div class="tax-item ${done?'is-done':''}">
        <span class="tax-check">${done?'✓':'☐'}</span>
        <span class="tax-name">${i.l}</span>
        ${numHtml}
      </div>`;
    }).join('');
  }
  function catStats(c){
    if (c.subgroups){
      let d=0,t=0;
      c.subgroups.forEach(sg => { d += sg.items.filter(isDone).length; t += sg.items.length; });
      return { d, t };
    }
    return { d: c.items.filter(isDone).length, t: c.items.length };
  }
  function catBody(c){
    if (c.subgroups){
      return c.subgroups.map(sg => {
        const d = sg.items.filter(isDone).length;
        return `<div class="tax-subgroup">
          <div class="tax-subgroup-head"><span>${sg.name}</span><span class="sg-ratio"><strong>${d}</strong> / ${sg.items.length}</span></div>
          ${renderItems(sg.items)}
        </div>`;
      }).join('');
    }
    return renderItems(c.items);
  }
  let total = 0, done = 0;
  let summaryHtml = '';
  let gridHtml = '';
  TAXONOMY.forEach(c => {
    const s = catStats(c);
    total += s.t; done += s.d;
    summaryHtml += `<div class="tax-summary-cell"><div class="key">${c.key}</div><div class="name">${c.name}</div><div class="ratio"><strong>${s.d}</strong> / ${s.t}</div></div>`;
    gridHtml += `<div class="tax-cat">
      <div class="tax-cat-head">
        <span class="tax-cat-key">${c.key}</span>
        <span class="tax-cat-name">${c.name}</span>
        <span class="tax-cat-ratio"><strong>${s.d}</strong> / ${s.t}</span>
      </div>
      ${catBody(c)}
    </div>`;
  });
  const pct = Math.round(done / total * 100);
  summary.innerHTML = `<div class="tax-summary-cell tax-total"><div class="key">${done}</div><div class="name">已完成</div><div class="ratio"><strong>${pct}%</strong> / ${total} 总项</div></div>${summaryHtml}`;
  grid.innerHTML = gridHtml;
})();
