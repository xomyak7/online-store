import { FC } from "react";
import { useDevices } from "../hooks/useDevices";
import { Pagination } from "react-bootstrap";
import { useActions } from "../hooks/useActions";

const Pages: FC = () => {
  const { currentPage, totalCount, limit } = useDevices();
  const { setPage } = useActions();
  const pageCount = Math.ceil(totalCount / limit);
  const pages: number[] = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <Pagination>
      {pages.map(page => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => setPage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
};

export default Pages;
