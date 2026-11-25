import { useRegisterSW } from 'virtual:pwa-register/react'

export default function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  function close() {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  if (!offlineReady && !needRefresh) {
    return null
  }

  return (
    <div className="pwa-prompt" role="alert">
      <span>
        {offlineReady
          ? 'App is ready to work offline.'
          : 'New content is available. Reload to update.'}
      </span>
      {needRefresh && (
        <button type="button" onClick={() => updateServiceWorker(true)}>
          Reload
        </button>
      )}
      <button type="button" className="secondary" onClick={close}>
        Close
      </button>
    </div>
  )
}
