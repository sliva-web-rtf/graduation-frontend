export const mapAvatarToDto = (dto: File): FormData => {
    const formData = new FormData();
    formData.append('file', dto);
    return formData;
};
