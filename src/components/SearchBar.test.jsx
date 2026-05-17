import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

import SearchBar from "./SearchBar";

function TestComponent() {
  const [search, setSearch] = useState("");

  return (
    <SearchBar
      search={search}
      setSearch={setSearch}
    />
  );
}

describe("SearchBar Component", () => {
  test("allows user to type into input", async () => {
    const user = userEvent.setup();

    render(<TestComponent />);

    const input = screen.getByPlaceholderText(/search products/i);

    await user.type(input, "hoodie");

    expect(input).toHaveValue("hoodie");
  });
});