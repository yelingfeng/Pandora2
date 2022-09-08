import type { ElMessageBoxOptions, NotificationProps } from 'element-plus'

import {
  ElMessageBox as MessageBox,
  ElMessage as Message,
  ElNotification as Notification
} from 'element-plus'
import {
  InfoFilled,
  WarningFilled,
  CircleCheckFilled,
  CircleCloseFilled
} from '@element-plus/icons-vue'

import { isString } from '@/_utils/is'

export interface NotifyApi {
  info(config: NotificationProps): void
  success(config: NotificationProps): void
  error(config: NotificationProps): void
  warning(config: NotificationProps): void
  open(args: NotificationProps): void
  close(key: String): void
}

export declare type NotificationPlacement =
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
export declare type IconType = 'success' | 'info' | 'error' | 'warning'
export interface ModalOptionsEx extends Omit<ElMessageBoxOptions, 'type'> {
  type: '' | 'warning' | 'success' | 'error' | 'info'
}
export type ModalOptionsPartial = Partial<ModalOptionsEx> &
  Pick<ModalOptionsEx, 'message'>

interface ConfirmOptions {
  info: ElMessageBoxOptions
  success: ElMessageBoxOptions
  error: ElMessageBoxOptions
  warning: ElMessageBoxOptions
}

function getIcon(icon: string) {
  if (icon === 'warning') {
    return <WarningFilled class="modal-icon-warning" />
  } else if (icon === 'success') {
    return <CircleCheckFilled class="modal-icon-success" />
  } else if (icon === 'info') {
    return <InfoFilled class="modal-icon-info" />
  } else {
    return <CircleCloseFilled class="modal-icon-error" />
  }
}

function renderContent({ message }: Pick<ModalOptionsEx, 'message'>) {
  if (isString(message)) {
    return <div innerHTML={`<div>${message as string}</div>`}></div>
  } else {
    return message
  }
}

/**
 * @description: Create confirmation box
 */
function createConfirm(options: ModalOptionsEx): ConfirmOptions {
  const iconType = options.type || 'warning'
  Reflect.deleteProperty(options, 'iconType')
  const opt: ElMessageBoxOptions = {
    center: true,
    type: iconType,
    ...options,
    message: renderContent(options)
  }
  return MessageBox.confirm(opt) as unknown as ConfirmOptions
}

const getBaseOptions = () => {
  return {
    'confirm-button-text': 'ok',
    center: true
  }
}

function createModalOptions(
  options: ModalOptionsPartial,
  icon: string
): ModalOptionsPartial {
  return {
    ...getBaseOptions(),
    ...options,
    message: renderContent(options),
    dangerouslyUseHTMLString: true,
    icon: getIcon(icon)
  }
}

function createSuccessModal(options: ModalOptionsPartial) {
  return MessageBox.alert(createModalOptions(options, 'success'))
}

function createErrorModal(options: ModalOptionsPartial) {
  return MessageBox.alert(createModalOptions(options, 'close'))
}

function createInfoModal(options: ModalOptionsPartial) {
  return MessageBox.alert(createModalOptions(options, 'info'))
}

function createWarningModal(options: ModalOptionsPartial) {
  return MessageBox.alert(createModalOptions(options, 'warning'))
}

// Notification.config({
//   placement: 'topRight',
//   duration: 3
// })

/**
 * @description: message
 */
export function useMessage() {
  return {
    createMessage: Message,
    notification: Notification as NotifyApi,
    createConfirm: createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal
  }
}
