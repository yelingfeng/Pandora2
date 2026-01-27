import type { ElMessageBoxOptions, NotificationProps } from 'element-plus'

import {
  CircleCheckFilled,
  CircleCloseFilled,
  InfoFilled,
  WarningFilled
} from '@element-plus/icons-vue'
import {
  ElMessage as Message,
  ElMessageBox as MessageBox,
  ElNotification as Notification
} from 'element-plus'

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
function createConfirm(options: ModalOptionsEx): Promise<any> {
  const { type, title, message, ...rest } = options
  const iconType = type || 'warning'
  const content = renderContent(options)
  const opt: ElMessageBoxOptions = {
    center: true,
    type: iconType,
    title,
    message: content,
    ...rest
  }
  return MessageBox.confirm(content, title, opt)
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
  const opt = createModalOptions(options, 'success')
  return MessageBox.alert(opt.message, opt.title, opt)
}

function createErrorModal(options: ModalOptionsPartial) {
  const opt = createModalOptions(options, 'close')
  return MessageBox.alert(opt.message, opt.title, opt)
}

function createInfoModal(options: ModalOptionsPartial) {
  const opt = createModalOptions(options, 'info')
  return MessageBox.alert(opt.message, opt.title, opt)
}

function createWarningModal(options: ModalOptionsPartial) {
  const opt = createModalOptions(options, 'warning')
  return MessageBox.alert(opt.message, opt.title, opt)
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
    notification: Notification as unknown as NotifyApi,
    createConfirm: createConfirm,
    createSuccessModal,
    createErrorModal,
    createInfoModal,
    createWarningModal
  }
}
