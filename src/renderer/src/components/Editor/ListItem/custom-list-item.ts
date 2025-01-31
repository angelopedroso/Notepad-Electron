import ListItem from '@tiptap/extension-list-item'

export const CustomListItem = ListItem.extend({
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { state, dispatch } = this.editor.view
        const { $from } = state.selection
        const node = $from.node($from.depth)

        if (node.type.name === 'taskItem') {
          return false
        }
        return this.editor.commands.splitListItem('listItem')
      },
    }
  },
})
