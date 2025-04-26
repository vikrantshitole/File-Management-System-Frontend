export const getParentFolderDetails = (folders, folder, target) => {
  for (let child of folders) {
    if (child.id === target[0] && child.type === 'folder') {
      if (child.id === folder.parent_id) {
        return child;
      }
      const result = getParentFolderDetails(child.children, folder, target.slice(1));
      if (result) return result;
    }
  }
};
export const getbreadcrumb = (folders, target) => {
  const breadcrumb = [];
  for (let folder of folders) {
    if (folder.id === target[0] && folder.type === 'folder') {
      breadcrumb.push(folder, ...getbreadcrumb(folder.children, target.slice(1)));
    }
  }
  return breadcrumb;
};

export const formatDate = dateString => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(',', '');
};

export const formatTime = dateString => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(',', '').split(' ')[1];
};
export const getCurrentFolderExpanded = (folders, folder, target) => {
  let newFolders = [];
  for (let child of folders) {
    if (child.id === folder.id) {
      newFolders.push({
        ...child,
        expanded: !folder.expanded,
        children: getCurrentFolderExpanded(child.children, folder, target.slice(1)),
      });
    } else if (child.id === target[0] && child.type === 'folder') {
      newFolders.push({
        ...child,
        expanded: true,
        children: getCurrentFolderExpanded(child.children, folder, target.slice(1)),
      });
    } else {
      newFolders.push({
        ...child,
        expanded: false,
        children: getCurrentFolderExpanded(child.children, folder, target.slice(1)),
      });
    }
  }
  return newFolders;
};
