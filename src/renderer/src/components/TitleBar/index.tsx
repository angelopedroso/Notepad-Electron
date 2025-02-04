import clsx from 'clsx'

export function TitleBar() {
  const isMacOS = process.platform === 'darwin'

  return (
    <div
      className={clsx(
        'w-full mr-auto min-h-8 text-rotion-200 select-none region-drag',
        { hidden: isMacOS, flex: !isMacOS },
      )}
    ></div>
  )
}
