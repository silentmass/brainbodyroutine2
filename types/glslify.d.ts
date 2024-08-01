declare module 'glslify' {
  function glslify(
    template: TemplateStringsArray,
    ...substitutions: any[]
  ): string
  namespace glslify {}
  export = glslify
}
declare module '*.vert' {
  const content: string
  export default content
}

declare module '*.frag' {
  const content: string
  export default content
}

declare module '*.glsl' {
  const content: string
  export default content
}

declare module '*.vs' {
  const content: string
  export default content
}

declare module '*.fs' {
  const content: string
  export default content
}
