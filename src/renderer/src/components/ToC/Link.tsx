import { TableOfContentDataItem } from '@tiptap-pro/extension-table-of-contents'
import { MouseEvent } from 'react'

import { cn } from '../../lib/utils'

interface ToCLinkProps {
  item: TableOfContentDataItem
  onItemClick: (
    e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
    id: string,
  ) => void
}

export function ToCLink({ item, onItemClick }: ToCLinkProps) {
  return (
    <div
      className={cn(
        'rounded transition-all',
        item.isScrolledOver && 'text-muted-foreground',
        item.isActive && !item.isScrolledOver && 'text-accent-foreground',
      )}
      style={{
        paddingLeft: `calc(0.875rem * (${item.level} - 1))`,
      }}
    >
      <a
        href={`#${item.id}`}
        onClick={(e) => onItemClick(e, item.id)}
        data-item-index={item.itemIndex}
        className="break-words"
        style={{
          wordBreak: 'break-word',
        }}
      >
        {item.textContent}
      </a>
    </div>
  )
}
