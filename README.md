# Описание компонентов

## ImageSlider
Компонент рисует весь слайдер картинок, параметры:
 - список картинок(images)
 - задержка в миллисекундах(timeout)ы

## ControlsSlider
Компонент рисует управление слайдером, параметры:
 - количество картинок(imagesAmount)
 - номер текущего слайда для расчета след. перехода(currentSlide)
 - коллбэк на изменение слайд для след перехода(onDestinationSlideChange)

## SliderRow
 Компонент рисует строку с картинками, параметры:
  - список картинок(images)
  - задержка в миллисекундах(timeout)
  - слайд на который необходимо осуществить переход (destinationSlide)
  - коллбэк на изменение текущего слайда(onCurrentSlideChange)


