// Libraries
import { render, screen } from '@testing-library/react';

// Components
import * as Avatar from '@Components/Avatar/Avatar';
import { ChatSelectionElement } from './ChatSelectionElement';

describe('ChatSelectionElement', () => {
  beforeEach(() => {
    jest.spyOn(Avatar, 'Avatar').mockReturnValue(<div data-testid="Avatar" />);
  });

  describe('should render correctly', () => {
    it('should render correctly if it has not new messages', () => {
      render(
        <ChatSelectionElement
          name="John"
          countOfNewMessages={0}
          avatarLink="test"
          lastVisitDate="02.05.2015"
          changeChat={() => {}}
        />,
      );

      const lastVisitDate = screen.queryByText('02.05.2015');
      const name = screen.queryByText('John');
      const countOfNewMessages = screen.queryByText('0');
      const avatar = screen.queryByTestId('Avatar');

      expect(lastVisitDate).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(avatar).toBeInTheDocument();
      expect(countOfNewMessages).not.toBeInTheDocument();
    });

    it('should render correctly if it has new messages', () => {
      render(
        <ChatSelectionElement
          name="John"
          countOfNewMessages={1}
          avatarLink="test"
          lastVisitDate="02.05.2015"
          lastMessage={}
          changeChat={() => {}}
        />,
      );

      const lastVisitDate = screen.queryByText('02.05.2015');
      const name = screen.queryByText('John');
      const countOfNewMessages = screen.queryByText('1');
      const avatar = screen.queryByTestId('Avatar');
      const lastMessage = screen.queryByText('Hello');

      expect(lastVisitDate).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(avatar).toBeInTheDocument();
      expect(countOfNewMessages).toBeInTheDocument();
      expect(lastMessage).toBeInTheDocument();
    });
  });
});
