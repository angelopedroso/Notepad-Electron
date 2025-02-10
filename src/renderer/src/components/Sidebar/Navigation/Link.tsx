import clsx from 'clsx'
import { DotsThree, TrashSimple } from 'phosphor-react'
import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

import { useDeleteDocument } from '../../../api/electron/hooks/delete-document'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'

interface LinkProps {
  to: string
  id: string
  children: ReactNode
}

export function Link({ children, to, id }: LinkProps) {
  const { deleteDocument, isDeletingDocument } = useDeleteDocument(id!)

  return (
    <div className="flex items-center group/link hover:bg-rotion-700 py-1 px-3 rounded has-[.active]:bg-rotion-700">
      <NavLink
        to={to}
        className={({ isActive }) =>
          clsx(
            'flex w-11/12 items-center text-sm gap-2 text-rotion-100 group-hover/link:text-accent-foreground',
            {
              'active bg-rotion-700': isActive,
            },
          )
        }
      >
        <span className="truncate flex-1">{children}</span>
      </NavLink>
      <div className="flex items-center invisible h-full group-hover/link:visible text-rotion-100">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-px rounded-sm hover:bg-rotion-500">
              <DotsThree weight="bold" className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem className="items-center gap-1 text-rotion-100 text-sm hover:text-accent-foreground p-0">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    className="rounded-sm hover:bg-rotion-500 flex gap-1 items-center w-full px-2 py-1.5"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    <TrashSimple className="h-4 w-4" />
                    Apagar
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogTitle>
                    Deseja realmente excluir o arquivo{' '}
                    <strong className="text-accent-foreground">
                      {children}
                    </strong>
                    ?
                  </AlertDialogTitle>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => deleteDocument()}
                      disabled={isDeletingDocument}
                    >
                      Apagar
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
