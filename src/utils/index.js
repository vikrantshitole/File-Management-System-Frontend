export const getParentFolderDetails = (folders, folder, target) => {
    console.log(folders, folder, target);

    for (let child of folders) {
        if (child.id === target[0] && child.type === 'folder') {
            if (child.id === folder.parent_id) {
                return child;
            }
            const result = getParentFolderDetails(child.children, folder, target.slice(1));
            if (result) return result;
        }
    }
}
const getbreadcrumb = (folders, target) => {
    const breadcrumb = [];
    for (let folder of folders) {
        if (folder.id === target[0] && folder.type === 'folder') {
            breadcrumb.push(folder, ...getbreadcrumb(folder.children, target.slice(1)))
        }
    }
    return breadcrumb;
}

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).replace(',', '');
  };
