const dropZone = {
  $dropZone: document.querySelector('.drop-zone'),
  $input: document.querySelector('input'),
  files: null,
  DOMContentLoaded() {
    ['dragover', 'dragleave', 'drop', 'click'].forEach((eventName) => {
      this.$dropZone.addEventListener(eventName, this.onDropZone.bind(this));
    });
    this.$input.addEventListener('change', (e) => {
      this.files = e.target.files;
      this.processFiles();
    });
  },
  onDropZone(e) {
    e.preventDefault();
    switch (e.type) {
      case 'dragover':
        this.$dropZone.classList.add('drop-zone_active');
        break;
      case 'dragleave':
        this.$dropZone.classList.remove('drop-zone_active');
        break;
      case 'drop':
        this.files = e.dataTransfer.files;
        this.processFiles();
        break;
      case 'click':
        this.$input.click();
    }
  },
  processFiles() {
    const fileType = this.files[0].type;
    const validExtensions = ['image/png', 'image/jpeg', 'image/jpg'];
    if (validExtensions.includes(fileType)) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        // это base64 формат изображения
        const fileURL = fileReader.result;
        // создание тега img и передача выбранного польз. исх. файла и атрибут src
        const imgTag = `<img src="${fileURL}" alt=""`;
        // добавление только что созданного img tag в dropZone контейнер
        this.$dropZone.innerHTML = imgTag;
      };
      fileReader.readAsDataURL(this.files[0]);
    } else {
      this.$dropZone.classList.remove('drop-zone_active');
    }
  },
};

document.addEventListener('DOMContentLoaded', dropZone.DOMContentLoaded.bind(dropZone));
