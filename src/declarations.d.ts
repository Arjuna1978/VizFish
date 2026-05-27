//This is what I use to tell TS custom types
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}


declare module '*?raw' {
  const content: string;
  export default content;
}

declare module 'web-vitals';


declare module '*.svg' {
  const src: string;
  export default src;
}
