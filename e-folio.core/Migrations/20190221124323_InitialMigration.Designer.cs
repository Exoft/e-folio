﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using eFolio.EF;

namespace e_folio.core.Migrations
{
    [DbContext(typeof(eFolioDBContext))]
    [Migration("20190221124323_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("eFolio.EF.ClientEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Comment");

                    b.Property<string>("FullNameClient");

                    b.HasKey("Id");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("eFolio.EF.ContactPersonEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ClientEntityId");

                    b.Property<string>("Comment");

                    b.Property<string>("FullName");

                    b.Property<int>("Phone");

                    b.Property<string>("eMail");

                    b.HasKey("Id");

                    b.HasIndex("ClientEntityId");

                    b.ToTable("ContactPersons");
                });

            modelBuilder.Entity("eFolio.EF.ContextEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("SourceCodeLink");

                    b.HasKey("Id");

                    b.ToTable("Contexsts");
                });

            modelBuilder.Entity("eFolio.EF.DeveloperEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CVLink");

                    b.Property<string>("FullName");

                    b.HasKey("Id");

                    b.ToTable("Developers");
                });

            modelBuilder.Entity("eFolio.EF.FolioFileEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ContextEntityId");

                    b.Property<bool>("IsInternal");

                    b.Property<string>("Path");

                    b.HasKey("Id");

                    b.HasIndex("ContextEntityId");

                    b.ToTable("FolioFiles");
                });

            modelBuilder.Entity("eFolio.EF.ProjectDeveloperEntity", b =>
                {
                    b.Property<int>("ProjectId");

                    b.Property<int>("DeveloperId");

                    b.HasKey("ProjectId", "DeveloperId");

                    b.HasIndex("DeveloperId");

                    b.ToTable("ProjectDeveloperEntity");
                });

            modelBuilder.Entity("eFolio.EF.ProjectEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ContextId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("ContextId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("eFolio.EF.ContactPersonEntity", b =>
                {
                    b.HasOne("eFolio.EF.ClientEntity")
                        .WithMany("ContactPersons")
                        .HasForeignKey("ClientEntityId");
                });

            modelBuilder.Entity("eFolio.EF.FolioFileEntity", b =>
                {
                    b.HasOne("eFolio.EF.ContextEntity")
                        .WithMany("ScreenLinks")
                        .HasForeignKey("ContextEntityId");
                });

            modelBuilder.Entity("eFolio.EF.ProjectDeveloperEntity", b =>
                {
                    b.HasOne("eFolio.EF.DeveloperEntity", "DeveloperEntity")
                        .WithMany("Projects")
                        .HasForeignKey("DeveloperId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("eFolio.EF.ProjectEntity", "ProjectEntity")
                        .WithMany("Developers")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("eFolio.EF.ProjectEntity", b =>
                {
                    b.HasOne("eFolio.EF.ContextEntity", "Context")
                        .WithMany()
                        .HasForeignKey("ContextId");
                });
#pragma warning restore 612, 618
        }
    }
}
