"use client";

import { useState } from "react";
import {
  Eye,
  Code,
  Trash2,
  Edit,
  Clock,
  FileText,
  Search,
  Plus,
  LayoutGrid,
  Settings,
  HelpCircle,
} from "lucide-react";
import styles from "./page.module.css";
import Modal from "./modal";

export default function LanguageImagesDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const languageImages = [
    { name: "Python", version: "3.9", status: "Ready", created: "2023-10-15" },
    {
      name: "JavaScript",
      version: "ES2021",
      status: "Ready",
      created: "2023-10-10",
    },
    { name: "Java", version: "17", status: "Building", created: "2023-10-18" },
    { name: "Ruby", version: "3.1", status: "Failed", created: "2023-10-12" },
    {
      name: "Go",
      version: "1.18",
      status: "Scheduled for Deletion",
      created: "2023-10-05",
    },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={styles.container}>
      {/* Main content */}
      <div className={styles.content}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <div className={styles.breadcrumbInner}>
            <span className={styles.breadcrumbItem}>Dashboard</span>
            <span className={styles.breadcrumbSeparator}>&gt;</span>
            <span className={styles.breadcrumbItemActive}>Language Images</span>
          </div>
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Language Images</h1>
          <div className={styles.headerButtons}>
            <button className={styles.createButton}>Create New Image</button>
            <button className={styles.pruneButton}>Prune All Images</button>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "all" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Images
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "building" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("building")}
            >
              Building
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "ready" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("ready")}
            >
              Ready
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "failed" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("failed")}
            >
              Failed
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "scheduled" ? styles.tabActive : ""
              }`}
              onClick={() => setActiveTab("scheduled")}
            >
              Scheduled for Deletion
            </button>
          </div>

          <div className={styles.tabContent}>
            {/* Search */}
            <div className={styles.searchContainer}>
              <p className={styles.searchLabel}>Search</p>
              <div className={styles.searchInputContainer}>
                <input
                  type="text"
                  placeholder="Search by name or version"
                  className={styles.searchInput}
                />
                <Search className={styles.searchIcon} />
              </div>
            </div>

            {/* Table */}
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead className={styles.tableHeader}>
                  <tr>
                    <th className={styles.tableHeaderCell}>Name</th>
                    <th className={styles.tableHeaderCell}>Version</th>
                    <th className={styles.tableHeaderCell}>Status</th>
                    <th className={styles.tableHeaderCell}>Created</th>
                    <th className={styles.tableHeaderCell}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {languageImages.map((image) => (
                    <tr
                      key={image.name}
                      className={styles.tableRow}
                      onClick={() => handleImageClick(image)}
                    >
                      <td className={styles.tableCell}>
                        <div className={styles.nameCell}>
                          <Code className={styles.nameIcon} />
                          <span>{image.name}</span>
                        </div>
                      </td>
                      <td className={styles.tableCell}>{image.version}</td>
                      <td className={styles.tableCell}>{image.status}</td>
                      <td className={styles.tableCell}>{image.created}</td>
                      <td className={styles.tableCell}>
                        <div className={styles.actions}>
                          <button className={styles.actionButton}>
                            <Eye className={styles.actionIcon} />
                          </button>
                          <button className={styles.actionButton}>
                            <Edit className={styles.actionIcon} />
                          </button>
                          <button className={styles.actionButton}>
                            <Trash2 className={styles.actionIcon} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedImage && (
          <div className={styles.detailsContainer}>
            <h2 className={styles.detailsTitle}>Image Details</h2>
            <div className={styles.detailsCard}>
              <div className={styles.detailsCardHeader}>
                <div className={styles.detailsCardHeaderContent}>
                  <div className={styles.detailsCardIcon}>
                    <Code className={styles.detailsCardIconInner} />
                  </div>
                  <div>
                    <h3 className={styles.detailsCardTitle}>
                      {selectedImage.name} {selectedImage.version}
                    </h3>
                    <p className={styles.detailsCardSubtitle}>
                      Status: {selectedImage.status}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.detailsCardContent}>
                <div className={styles.detailsCardButtons}>
                  <button className={styles.updateButton}>Update</button>
                  <button className={styles.deleteButton}>Delete</button>
                </div>
              </div>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailsItem}>
                <div className={styles.detailsItemIcon}>
                  <Code className={styles.detailsItemIconInner} />
                </div>
                <div>
                  <p className={styles.detailsItemTitle}>Base Image</p>
                  <p className={styles.detailsItemValue}>
                    {selectedImage.name.toLowerCase()}:{selectedImage.version}
                    -slim
                  </p>
                </div>
              </div>
              <div className={styles.detailsItem}>
                <div className={styles.detailsItemIcon}>
                  <FileText className={styles.detailsItemIconInner} />
                </div>
                <div>
                  <p className={styles.detailsItemTitle}>File Extension</p>
                  <p className={styles.detailsItemValue}>
                    .{selectedImage.name.toLowerCase().slice(0, 2)}
                  </p>
                </div>
              </div>
              <div className={styles.detailsItem}>
                <div className={styles.detailsItemIcon}>
                  <Settings className={styles.detailsItemIconInner} />
                </div>
                <div>
                  <p className={styles.detailsItemTitle}>
                    Requires Compilation
                  </p>
                  <p className={styles.detailsItemValue}>No</p>
                </div>
              </div>
              <div className={styles.detailsItem}>
                <div className={styles.detailsItemIcon}>
                  <Clock className={styles.detailsItemIconInner} />
                </div>
                <div>
                  <p className={styles.detailsItemTitle}>Created</p>
                  <p className={styles.detailsItemValue}>
                    {selectedImage.created}
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Execution Command</h3>
              <div className={styles.codeBlock}>
                <code className={styles.code}>
                  {selectedImage.name.toLowerCase()} {"{filename}"}
                </code>
                <Code className={styles.codeIcon} />
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Description</h3>
              <div className={styles.descriptionBox}>
                <p className={styles.descriptionText}>
                  {selectedImage.name} {selectedImage.version} language image
                  for running {selectedImage.name} code in a sandbox
                  environment.
                </p>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Build Logs</h3>
              <div className={styles.logsBox}>
                <p className={styles.logLine}>
                  [{selectedImage.created} 14:28:10] Starting build process
                </p>
                <p className={styles.logLine}>
                  [{selectedImage.created} 14:28:45] Pulling base image{" "}
                  {selectedImage.name.toLowerCase()}:{selectedImage.version}
                  -slim
                </p>
                <p className={styles.logLine}>
                  [{selectedImage.created} 14:29:30] Setting up environment
                </p>
                <p className={styles.logLine}>
                  [{selectedImage.created} 14:30:15] Build completed
                  successfully
                </p>
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.pruneImageButton}>Prune Image</button>
              <button className={styles.retryBuildButton}>Retry Build</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
