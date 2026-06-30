export function useBreadcrumb(getLabel: () => string) {
  const route = useRoute()
  const labelState = useState<string>(`breadcrumb-label-${route.path}`)
  
  if (import.meta.server) {
    labelState.value = getLabel()
  } else {
    watchEffect(() => {
      labelState.value = getLabel()
    })
  }
  
  return labelState
}
