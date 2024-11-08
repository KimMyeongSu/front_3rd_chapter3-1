import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Notifications } from './index';

describe('Notifications', () => {
  const mockSetNotifications = vi.fn();

  it('알림이 없을 때 아무것도 렌더링하지 않는다', () => {
    const { container } = render(
      <Notifications notifications={[]} setNotifications={mockSetNotifications} />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
