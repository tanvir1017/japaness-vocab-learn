import VocabularyManagementTable from "./vocabulary-management-table";

const VocabularyManagement = () => {
  return (
    <div className="px-10">
      <div className="border p-1.5">
        <div className="px-1.5 pt-5 pb-8">
          <h2 className="text-xl font-bold">View All Vocabularies</h2>
          <p className="italic text-zinc-500">
            All vocabularies are be listed here available on database.
          </p>
        </div>
        <VocabularyManagementTable />
      </div>
    </div>
  );
};

export default VocabularyManagement;
