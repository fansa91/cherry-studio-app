import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import React from 'react'
import { useTheme } from 'tamagui'

interface ISheetProps {
  bottomSheetRef?: React.RefObject<BottomSheet | null>
  isOpen: boolean
  onClose: () => void
  snapPoints: string[]
  children: React.ReactNode
  enablePanDownToClose?: boolean
}

export function ISheet({
  bottomSheetRef,
  isOpen,
  onClose,
  snapPoints,
  children,
  enablePanDownToClose = true
}: ISheetProps) {
  const theme = useTheme()
  const memoizedSnapPoints = snapPoints

  // 根据 isOpen 属性确定 BottomSheet 的 index
  // 当 isOpen 为 true 时，index 为 0 (第一个吸附点)；为 false 时，index 为 -1 (关闭状态)
  const sheetIndex = isOpen ? 0 : -1

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.8} />
  )

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={sheetIndex}
      snapPoints={memoizedSnapPoints}
      enablePanDownToClose={enablePanDownToClose}
      backdropComponent={renderBackdrop}
      onClose={onClose} // 当用户通过手势关闭或调用 close() 方法时触发
      backgroundStyle={{
        borderRadius: 30,
        backgroundColor: theme.gray2.val
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.color.val
      }}>
      <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
    </BottomSheet>
  )
}
