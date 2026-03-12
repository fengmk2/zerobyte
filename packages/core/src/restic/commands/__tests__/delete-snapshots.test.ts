import { afterEach, describe, expect, mock, spyOn, test } from "bun:test";
import * as cleanupModule from "../../helpers/cleanup-temporary-keys";
import * as nodeModule from "../../../node";
import { deleteSnapshots } from "../delete-snapshots";
import type { ResticDeps } from "../../types";

const mockDeps: ResticDeps = {
	resolveSecret: async (s) => s,
	getOrganizationResticPassword: async () => "org-restic-password",
	resticCacheDir: "/tmp/restic-cache",
	resticPassFile: "/tmp/restic.pass",
	defaultExcludes: ["/tmp/restic.pass", "/var/lib/zerobyte/repositories"],
};

const config = {
	backend: "local" as const,
	path: "/tmp/restic-repo",
	isExistingRepository: true,
	customPassword: "custom-password",
};

const setup = () => {
	let capturedArgs: string[] = [];

	spyOn(cleanupModule, "cleanupTemporaryKeys").mockImplementation(() => Promise.resolve());
	spyOn(nodeModule, "safeExec").mockImplementation(async ({ args }) => {
		capturedArgs = args ?? [];
		return { exitCode: 0, stdout: "", stderr: "", timedOut: false };
	});

	return {
		getArgs: () => capturedArgs,
	};
};

afterEach(() => {
	mock.restore();
});

describe("deleteSnapshots command", () => {
	test("treats flag-like snapshot IDs as positional args", async () => {
		const { getArgs } = setup();
		const snapshotIds = ["--help", "--password-command=sh -c 'id'"];

		await deleteSnapshots(config, snapshotIds, "org-1", mockDeps);

		expect(getArgs()).toEqual(["--repo", "/tmp/restic-repo", "forget", "--prune", "--json", "--", ...snapshotIds]);
	});
});
