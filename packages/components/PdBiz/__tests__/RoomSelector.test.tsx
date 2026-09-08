import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RoomSelector from '../src/RoomSelector.vue'
import type { IRoomItem } from '../src/types'

describe('RoomSelector', () => {
  const roomList: IRoomItem[] = [
    { value: 'room1', name: '机房1' },
    { value: 'room2', name: '机房2' },
    { value: 'room3', name: '机房3' }
  ]

  it('renders correctly with default props', () => {
    const wrapper = mount(RoomSelector, {
      global: {
        stubs: {
          'el-popover': true,
          'el-input': true,
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    expect(wrapper.find('.pd-biz-room-selector').exists()).toBe(true)
  })

  it('displays room name when value is selected', () => {
    const wrapper = mount(RoomSelector, {
      props: {
        modelValue: 'room1',
        roomList
      },
      global: {
        stubs: {
          'el-popover': true,
          'el-input': true,
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    expect(wrapper.vm.displayValue).toBe('机房1')
  })

  it('displays value when room not found', () => {
    const wrapper = mount(RoomSelector, {
      props: {
        modelValue: 'unknown',
        roomList
      },
      global: {
        stubs: {
          'el-popover': true,
          'el-input': true,
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    expect(wrapper.vm.displayValue).toBe('unknown')
  })

  it('shows clearable icon when value is set', () => {
    const wrapper = mount(RoomSelector, {
      props: {
        modelValue: 'room1',
        roomList
      },
      global: {
        stubs: {
          'el-popover': true,
          'el-input': true,
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    expect(wrapper.vm.showClearable).toBe(true)
  })

  it('filters room list by search keyword', async () => {
    const wrapper = mount(RoomSelector, {
      props: {
        roomList
      },
      global: {
        stubs: {
          'el-popover': true,
          'el-input': true,
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    wrapper.vm.searchKeyword = '机房1'
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.filteredRoomList.length).toBe(1)
    expect(wrapper.vm.filteredRoomList[0].name).toBe('机房1')
  })

  it('filters room list by value', async () => {
    const wrapper = mount(RoomSelector, {
      props: {
        roomList
      },
      global: {
        stubs: {
          'el-popover': true,
          'el-input': true,
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    wrapper.vm.searchKeyword = 'room2'
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.filteredRoomList.length).toBe(1)
    expect(wrapper.vm.filteredRoomList[0].value).toBe('room2')
  })

  it('emits update:modelValue and change events when room is selected', async () => {
    const wrapper = mount(RoomSelector, {
      props: {
        roomList,
        isp: '1'
      },
      global: {
        stubs: {
          'el-popover': true,
          'el-input': true,
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    await wrapper.vm.$nextTick()
    await wrapper.vm.handleCurrentChange(roomList[0])

    const updateModelValueEvents = wrapper.emitted('update:modelValue')
    const changeEvents = wrapper.emitted('change')

    expect(updateModelValueEvents).toBeTruthy()
    expect(updateModelValueEvents?.[updateModelValueEvents.length - 1]).toEqual(['room1'])
    expect(changeEvents).toBeTruthy()
    expect(wrapper.vm.visible).toBe(false)
  })

  it('emits cleared event when clear is called', async () => {
    const wrapper = mount(RoomSelector, {
      props: {
        modelValue: 'room1',
        roomList
      },
      global: {
        stubs: {
          'el-popover': true,
          'el-input': true,
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    await wrapper.vm.handleClear()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('cleared')).toBeTruthy()
    expect(wrapper.vm.searchKeyword).toBe('')
  })

  it('emits load-data event when loadRoomList is called with isp', () => {
    const wrapper = mount(RoomSelector, {
      props: {
        isp: '1'
      },
      global: {
        stubs: {
          'el-popover': true,
          'el-input': true,
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    wrapper.vm.loadRoomList()
    expect(wrapper.emitted('load-data')).toBeTruthy()
  })

  it('uses provided roomList prop', () => {
    const wrapper = mount(RoomSelector, {
      props: {
        roomList
      },
      global: {
        stubs: {
          'el-popover': true,
          'el-input': true,
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    expect(wrapper.vm.internalRoomList.length).toBe(3)
  })

  it('clears value when isp changes', async () => {
    const wrapper = mount(RoomSelector, {
      props: {
        modelValue: 'room1',
        isp: '1',
        roomList
      },
      global: {
        stubs: {
          'el-popover': true,
          'el-input': true,
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    await wrapper.setProps({ isp: '2' })
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('returns all rooms when search keyword is empty', () => {
    const wrapper = mount(RoomSelector, {
      props: {
        roomList
      },
      global: {
        stubs: {
          'el-popover': true,
          'el-input': true,
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    wrapper.vm.searchKeyword = ''
    expect(wrapper.vm.filteredRoomList.length).toBe(3)
  })

  it('uses custom placeholder', () => {
    const wrapper = mount(RoomSelector, {
      props: {
        placeholder: '自定义占位符',
        roomList
      },
      global: {
        stubs: {
          'el-popover': true,
          'el-input': true,
          'el-table': true,
          'el-table-column': true
        }
      }
    })

    expect(wrapper.props('placeholder')).toBe('自定义占位符')
  })
})
