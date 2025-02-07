import { useEffect, useState } from 'react'

import { UpdaterDataCallbackResponse } from '~/src/shared/types/preload/updater'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

export function AlertUpdater() {
  const [updateNotes, setUpdateNotes] = useState<UpdaterDataCallbackResponse>()
  const [isDialogOpened, setIsDialogOpened] = useState(false)

  useEffect(() => {
    const unsubscribe = window.api.update.onUpdateDownloaded((data) => {
      setUpdateNotes(data)
      setIsDialogOpened(true)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  function handleActionInstallUpdate() {
    window.api.update.installNewVersion()
  }
  return (
    <>
      {updateNotes && (
        <AlertDialog open={isDialogOpened} onOpenChange={setIsDialogOpened}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Uma nova versão está disponível! 🤩
              </AlertDialogTitle>
              <AlertDialogDescription>
                A versão {updateNotes?.version} já está disponível! Atualize
                agora ou na próxima vez que abrir o Rotion.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Outra hora</AlertDialogCancel>
              <AlertDialogAction onClick={handleActionInstallUpdate}>
                Atualizar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
