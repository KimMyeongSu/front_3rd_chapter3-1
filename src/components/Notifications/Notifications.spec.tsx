import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Notifications } from './index';

describe('Notifications', () => {
  it('알림이 없을 때 아무것도 렌더링하지 않는다', () => {
    const { container } = render(<Notifications notifications={[]} setNotifications={vi.fn()} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('알림 닫기 버튼이 정상적으로 동작한다', () => {
    const mockSetNotifications = vi.fn();
    const notifications = [{ message: '테스트 알림' }];

    render(<Notifications notifications={notifications} setNotifications={mockSetNotifications} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockSetNotifications).toHaveBeenCalled();
  });
});
