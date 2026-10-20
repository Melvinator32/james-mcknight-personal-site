import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import LinkedText from "./LinkedText";

afterEach(cleanup);

describe("LinkedText", () => {
  test("turns a company mention into an outbound link to its website", () => {
    render(<LinkedText>Corporate development at IMTT.</LinkedText>);

    const link = screen.getByRole("link", { name: "IMTT" });
    expect(link.getAttribute("href")).toBe("https://imtt.com/");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  test("keeps the surrounding text intact", () => {
    const { container } = render(
      <LinkedText>Worked with Fidelis and Nscale on data centers.</LinkedText>,
    );

    expect(container.textContent).toBe(
      "Worked with Fidelis and Nscale on data centers.",
    );
    expect(screen.getAllByRole("link").map((a) => a.getAttribute("href"))).toEqual([
      "https://www.fidelisnewenergy.com/",
      "https://www.nscale.com",
    ]);
  });

  test("leaves text without company names unlinked", () => {
    render(<LinkedText>Fly fishing in Montana.</LinkedText>);

    expect(screen.queryByRole("link")).toBeNull();
  });
});
