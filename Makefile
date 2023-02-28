.PHONY: run-local
run-local:
	@act --workflows example.yml --container-architecture linux/amd64 --input VAULT_URL=foo --eventpath event.json --actor "dependabot[bot]"